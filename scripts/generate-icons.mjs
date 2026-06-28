import sharp from "sharp";
import { statSync } from "fs";

const src = "public/images/mfa-logo.png";

const jobs = [
  { output: "src/app/icon.png",       size: 32  },
  { output: "src/app/apple-icon.png", size: 180 },
];

for (const { output, size } of jobs) {
  await sharp(src)
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(output);
  const kb = Math.round(statSync(output).size / 1024 * 10) / 10;
  console.log(`${output}  (${size}×${size}px, ${kb} KB)`);
}
