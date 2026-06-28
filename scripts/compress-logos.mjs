import sharp from "sharp";
import { readFileSync, statSync } from "fs";

const jobs = [
  { input: "public/images/mfa-logo.png",  output: "public/images/mfa-logo.webp",  size: 120 },
  { input: "public/images/mfa-logox.png", output: "public/images/mfa-logox.webp", size: 160 },
];

for (const { input, output, size } of jobs) {
  const before = Math.round(statSync(input).size / 1024);
  await sharp(input)
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 90 })
    .toFile(output);
  const after = Math.round(statSync(output).size / 1024);
  console.log(`${input} → ${output}  (${before} KB → ${after} KB)`);
}
