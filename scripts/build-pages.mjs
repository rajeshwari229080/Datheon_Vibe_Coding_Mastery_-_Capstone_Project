import { spawn } from "child_process";
import fs from "fs";
import path from "path";

process.env.GITHUB_PAGES = "true";

console.log("🚀 Starting Next.js Static Export build for GitHub Pages...");
console.log("📦 Repository basePath: /Datheon_Vibe_Coding_Mastery_-_Capstone_Project");

const nextBin = path.resolve("./node_modules/next/dist/bin/next");
const child = spawn(process.execPath, [nextBin, "build"], {
  stdio: "inherit",
  env: process.env,
});

child.on("close", (code) => {
  if (code === 0) {
    const outDir = path.resolve("./out");
    if (fs.existsSync(outDir)) {
      const nojekyllPath = path.join(outDir, ".nojekyll");
      fs.writeFileSync(nojekyllPath, "");
      console.log("✅ Created out/.nojekyll to disable Jekyll processing on GitHub Pages.");
    }
    console.log("🎉 Static export build completed successfully in ./out");
    process.exit(0);
  } else {
    console.error(`❌ Build failed with exit code ${code}`);
    process.exit(code);
  }
});
