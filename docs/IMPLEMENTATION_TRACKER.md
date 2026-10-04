# Puravigal POS — Implementation Tracker

Last verified against repository source: 2026-10-04.

## Phase A — foundation
- [x] Legacy website removed from active tree
- [x] React/Vite shell
- [x] Mobile-first responsive workspace
- [x] Functional local POS workspace UI: billing, products, inventory, customers, suppliers, reports, settings
- [x] Product scope master specification
- [x] API service foundation
- [x] PostgreSQL domain schema foundation expanded for production flows
- [x] Auth API foundation: signup/login/JWT identity
- [x] Password hashing with bcrypt
- [x] API security headers and rate limiting
- [x] API validation with Zod
- [x] Database migration command
- [x] India/UAE localization architecture notes
- [x] GitHub Pages deployment workflow
- [ ] Production database connected
- [ ] Tenant isolation middleware with DB-level policy/testing
- [ ] Refresh/revocation session store wired into auth

## Full acceptance checklist
- [~] Authentication: signup/login foundation; social login, OTP recovery, session revocation UI/API still required
- [~] Organization/store/users/roles/permissions: schema and initial roles exist; full management UI/API/testing required
- [~] Onboarding: organization regional fields exist; guided onboarding and authoritative reference masters required
- [~] Catalog: core product CRUD/search and DB fields exist; edit/bulk/import/export/brand/unit UI/API still required
- [~] Customers and suppliers: create/search foundation exists; history/outstanding/payment ledger UI/API required
- [~] Inventory: balances/movements schema + local adjustment UI exist; transactional server stock engine required
- [~] Purchases: schema exists; full UI/API/stock receiving/payment/returns required
- [~] POS billing: local cart/discount/tax/payment workflow exists; server-authoritative transaction, receipt/invoice generation and concurrency tests required
- [~] Returns/refunds: schema exists; production workflow/API/permissions/refund adapters required
- [~] Invoice PDF/print/share/WhatsApp/email/SMS: delivery queue schema exists; renderer and provider adapters required
- [~] Tax engine: tax profiles/schema exist; effective-dated jurisdiction engine and country-specific rules still required
- [~] India GST: invoice data model is ready for required fields; live e-invoice/GSP integration requires credentials/provider
- [~] UAE VAT: 5% default and zero/exempt architecture documented; full UAE VAT rule pack and eInvoicing/Peppol ASP integration require implementation/provider
- [ ] Dashboard/report engine from authoritative server data
- [~] Plans/entitlements/usage: schema exists; enforcement/UI/billing required
- [~] Notifications: schema exists; event workers/channels required
- [~] Import/export: import job schema exists; mapping/validation/preview/export engine required
- [~] Audit trail: schema exists; automatic mutation instrumentation required
- [~] Security: baseline headers/rate limiting/password hashing/validation exist; full threat model, CSRF strategy, secret management and penetration testing required
- [~] Offline queue/sync: schema exists; client queue, conflict resolution and reconciliation engine required
- [ ] Backup/recovery and production operations
- [ ] Unit/integration/e2e/accessibility/browser/mobile QA

## External-provider boundary

These cannot be made genuinely live without the relevant accounts, credentials, contracts or infrastructure:
- Google / LinkedIn OAuth
- WhatsApp Business / Cloud API
- SMS provider
- Email provider
- Payment gateway/acquirer
- India GST/e-invoice/GSP credentials
- UAE Accredited Service Provider / Peppol onboarding
- Production PostgreSQL/cloud, object storage, secrets and monitoring

The codebase must provide adapters, validation and test doubles rather than fake live integrations.

## Definition of complete

A module is marked complete only when:
UI + API + database persistence + authorization + validation + loading/empty/error/success states + edge cases + audit/data integrity + automated tests + responsive QA are all verified.

A working screenshot alone never counts as completion.