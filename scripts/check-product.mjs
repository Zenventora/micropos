import fs from "node:fs";
const required=["src/App.jsx","src/styles.css","docs/MICRO_POS_DEVELOPMENT_MASTER.md","docs/BUILD_STATUS.md"];
const missing=required.filter(p=>!fs.existsSync(p));
if(missing.length){console.error("Missing:",missing.join(", "));process.exit(1)}
console.log("Puravigal POS foundation check: PASS");