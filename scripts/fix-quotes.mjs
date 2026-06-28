import { readFileSync, writeFileSync } from "fs";

const file = "src/app/page.tsx";
let c = readFileSync(file, "utf8");

// Replace left and right double curly quotes with straight ASCII quotes
const before = (c.match(/[“”]/g) || []).length;
c = c.split("“").join('"').split("”").join('"');

writeFileSync(file, c, "utf8");
console.log(`Fixed ${before} curly quotes in ${file}`);
