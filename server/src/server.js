import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import pg from "pg";
import { z } from "zod";

const {Pool}=pg;
const app=express();
const pool=process.env.DATABASE_URL?new Pool({connectionString:process.env.DATABASE_URL,ssl:process.env.DATABASE_SSL==="true"?{rejectUnauthorized:false}:undefined}):null;
const JWT_SECRET=process.env.JWT_SECRET||"development-only-change-me";
const apiLimiter=rateLimit({windowMs:15*60*1000,max:300,standardHeaders:true,legacyHeaders:false});
const authLimiter=rateLimit({windowMs:15*60*1000,max:30,standardHeaders:true,legacyHeaders:false});

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({origin:process.env.CORS_ORIGIN||true,credentials:true}));
app.use(express.json({limit:"1mb"}));
app.use("/api",apiLimiter);
app.use((req,res,next)=>{res.setHeader("X-API-Version","1");next()});

const sendError=(res,status,code,message,details)=>res.status(status).json({error:{code,message,details}});
const tokenFor=(user,orgId,role)=>jwt.sign({sub:user.id,email:user.email,orgId,role},JWT_SECRET,{expiresIn:"12h"});
const auth=async(req,res,next)=>{
 const h=req.headers.authorization||"";
 if(!h.startsWith("Bearer "))return sendError(res,401,"AUTH_REQUIRED","Authentication required.");
 try{req.user=jwt.verify(h.slice(7),JWT_SECRET);next()}catch{return sendError(res,401,"SESSION_EXPIRED","Session is invalid or expired.")}}
const requireRole=(...roles)=>(req,res,next)=>roles.includes(req.user.role)||req.user.role==="owner"||req.user.role==="admin"?next():sendError(res,403,"FORBIDDEN","You do not have permission for this action.");

const productSchema=z.object({name:z.string().min(1).max(200),sku:z.string().max(80).optional().nullable(),barcode:z.string().max(80).optional().nullable(),selling_price:z.coerce.number().nonnegative(),purchase_price:z.coerce.number().nonnegative().default(0),min_stock:z.coerce.number().nonnegative().default(0),tax_profile_id:z.string().uuid().optional().nullable(),category_id:z.string().uuid().optional().nullable(),hsn_sac:z.string().max(32).optional().nullable()});
const personSchema=z.object({name:z.string().min(1).max(200),phone:z.string().max(40).optional().nullable(),email:z.string().email().optional().nullable(),tax_id:z.string().max(80).optional().nullable(),notes:z.string().max(2000).optional().nullable()});

app.get("/api/health",async(_req,res)=>{let db="not-configured";if(pool){try{await pool.query("select 1");db="ok"}catch{db="error"}}res.json({ok:true,service:"puravigal-pos-api",database:db,time:new Date().toISOString()})});

app.post("/api/auth/signup",authLimiter,async(req,res)=>{
 if(!pool)return sendError(res,503,"DATABASE_NOT_CONFIGURED","Database is not configured.");
 const parsed=z.object({email:z.string().email(),password:z.string().min(8).max(128),display_name:z.string().min(1).max(120),business_name:z.string().min(1).max(200),country_code:z.string().length(2).default("IN"),currency_code:z.string().length(3).default("INR"),timezone:z.string().min(1).default("Asia/Kolkata"),locale:z.string().min(2).default("en-IN")}).safeParse(req.body);
 if(!parsed.success)return sendError(res,400,"VALIDATION_ERROR","Please check the signup details.",parsed.error.issues);
 const d=parsed.data; const client=await pool.connect();
 try{
  await client.query("begin");
  const exists=await client.query("select 1 from users where lower(email)=lower($1)",[d.email]);
  if(exists.rowCount)return sendError(res,409,"EMAIL_EXISTS","An account with this email already exists.");
  const hash=await bcrypt.hash(d.password,12);
  const u=(await client.query("insert into users(email,password_hash,display_name,is_verified) values(lower($1),$2,$3,true) returning id,email,display_name",[d.email,hash,d.display_name])).rows[0];
  const o=(await client.query("insert into organizations(name,country_code,currency_code,timezone,locale) values($1,$2,$3,$4,$5) returning id,name,country_code,currency_code,timezone,locale",[d.business_name,d.country_code,d.currency_code,d.timezone,d.locale])).rows[0];
  await client.query("insert into organization_users(organization_id,user_id,role) values($1,$2,'owner')",[o.id,u.id]);
  await client.query("insert into stores(organization_id,name,code) values($1,$2,'MAIN')",[o.id,d.business_name]);
  await client.query("insert into business_settings(organization_id) values($1)",[o.id]);
  await client.query("commit");
  res.status(201).json({user:u,organization:o,token:tokenFor(u,o.id,"owner")});
 }catch(e){await client.query("rollback");console.error(e);sendError(res,500,"SIGNUP_FAILED","Unable to create the account.")}finally{client.release()}
});

app.post("/api/auth/login",authLimiter,async(req,res)=>{
 if(!pool)return sendError(res,503,"DATABASE_NOT_CONFIGURED","Database is not configured.");
 const p=z.object({email:z.string().email(),password:z.string().min(1)}).safeParse(req.body);
 if(!p.success)return sendError(res,400,"VALIDATION_ERROR","Email and password are required.");
 try{
  const q=await pool.query("select u.id,u.email,u.display_name,u.password_hash,ou.organization_id,ou.role from users u join organization_users ou on ou.user_id=u.id where lower(u.email)=lower($1) and u.is_active=true limit 1",[p.data.email]);
  if(!q.rowCount||!q.rows[0].password_hash||!(await bcrypt.compare(p.data.password,q.rows[0].password_hash)))return sendError(res,401,"INVALID_CREDENTIALS","Email or password is incorrect.");
  const x=q.rows[0]; const user={id:x.id,email:x.email,display_name:x.display_name}; res.json({user,organization_id:x.organization_id,role:x.role,token:tokenFor(user,x.organization_id,x.role)});
 }catch(e){console.error(e);sendError(res,500,"LOGIN_FAILED","Unable to sign in.")}
});

app.get("/api/me",auth,async(req,res)=>{
 if(!pool)return sendError(res,503,"DATABASE_NOT_CONFIGURED","Database is not configured.");
 const q=await pool.query("select u.id,u.email,u.display_name,ou.organization_id,ou.role,o.name organization_name,o.country_code,o.currency_code,o.timezone,o.locale from users u join organization_users ou on ou.user_id=u.id join organizations o on o.id=ou.organization_id where u.id=$1 and o.id=$2",[req.user.sub,req.user.orgId]);
 if(!q.rowCount)return sendError(res,404,"NOT_FOUND","Account not found.");res.json(q.rows[0]);
});

const listRoute=(table,fields,schema,order="created_at desc")=>async(req,res)=>{
 if(!pool)return sendError(res,503,"DATABASE_NOT_CONFIGURED","Database is not configured.");
 const p=schema.safeParse(req.body); if(!p.success)return sendError(res,400,"VALIDATION_ERROR","Invalid data.",p.error.issues);
 const d=p.data; const cols=Object.keys(d).filter(k=>fields.includes(k)&&d[k]!==undefined); const vals=cols.map(k=>d[k]);
 try{
  const sql=`insert into ${table}(organization_id,${cols.join(",")}) values($1,${cols.map((_,i)=>"$"+(i+2)).join(",")}) returning *`;
  const q=await pool.query(sql,[req.user.orgId,...vals]);res.status(201).json(q.rows[0]);
 }catch(e){console.error(e);if(e.code==="23505")return sendError(res,409,"DUPLICATE","A record with the same unique value already exists.");sendError(res,500,"CREATE_FAILED","Unable to create record.")}
};
app.post("/api/products",auth,requireRole("manager","inventory"),listRoute("products",["name","sku","barcode","selling_price","purchase_price","min_stock","tax_profile_id","category_id","hsn_sac"],productSchema));
app.post("/api/customers",auth,listRoute("customers",["name","phone","email","tax_id","notes"],personSchema));
app.post("/api/suppliers",auth,requireRole("manager","inventory"),listRoute("suppliers",["name","phone","email","tax_id","notes"],personSchema));

app.get("/api/products",auth,async(req,res)=>{if(!pool)return sendError(res,503,"DATABASE_NOT_CONFIGURED","Database is not configured.");const q=String(req.query.q||"");const r=await pool.query("select * from products where organization_id=$1 and is_active=true and ($2='' or name ilike '%'||$2||'%' or coalesce(sku,'') ilike '%'||$2||'%' or coalesce(barcode,'') ilike '%'||$2||'%') order by name limit 100",[req.user.orgId,q]);res.json({items:r.rows});});
app.get("/api/customers",auth,async(req,res)=>{if(!pool)return sendError(res,503,"DATABASE_NOT_CONFIGURED","Database is not configured.");const q=String(req.query.q||"");const r=await pool.query("select * from customers where organization_id=$1 and ($2='' or name ilike '%'||$2||'%' or coalesce(phone,'') ilike '%'||$2||'%') order by name limit 100",[req.user.orgId,q]);res.json({items:r.rows});});
app.get("/api/suppliers",auth,async(req,res)=>{if(!pool)return sendError(res,503,"DATABASE_NOT_CONFIGURED","Database is not configured.");const r=await pool.query("select * from suppliers where organization_id=$1 order by name limit 100",[req.user.orgId]);res.json({items:r.rows});});

app.get("/api/dashboard",auth,async(req,res)=>{
 if(!pool)return sendError(res,503,"DATABASE_NOT_CONFIGURED","Database is not configured.");
 const [sales,bills,low,outstanding]=await Promise.all([
  pool.query("select coalesce(sum(grand_total),0) total from invoices where organization_id=$1 and status<>'cancelled' and created_at::date=current_date",[req.user.orgId]),
  pool.query("select count(*) count from invoices where organization_id=$1 and created_at::date=current_date",[req.user.orgId]),
  pool.query("select count(*) count from products p where p.organization_id=$1 and p.is_active=true and p.min_stock>0 and (select coalesce(sum(sb.quantity),0) from stock_balances sb where sb.product_id=p.id)<p.min_stock",[req.user.orgId]),
  pool.query("select coalesce(sum(greatest(i.grand_total-i.paid_total,0)),0) total from invoices i where i.organization_id=$1 and i.status in('issued','partially_paid')",[req.user.orgId])
 ]);
 res.json({sales:sales.rows[0].total,bills:bills.rows[0].count,lowStock:low.rows[0].count,outstanding:outstanding.rows[0].total});
});

app.use((err,_req,res,_next)=>{console.error(err);sendError(res,500,"INTERNAL_ERROR","Something went wrong.")});
const port=Number(process.env.PORT||4000);
app.listen(port,()=>console.log(`Puravigal POS API listening on :${port}`));