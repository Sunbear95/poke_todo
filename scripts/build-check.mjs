import { readFileSync } from "node:fs";

const requiredFiles = [
  "public/index.html",
  "public/styles.css",
  "public/app.mjs",
  "src/model.mjs",
  "src/demoData.mjs",
];

for (const file of requiredFiles) {
  const contents = readFileSync(file, "utf8");
  if (contents.trim().length === 0) {
    throw new Error(`${file} is empty`);
  }
}

console.log("Build check passed.");
