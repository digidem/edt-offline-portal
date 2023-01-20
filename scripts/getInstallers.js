// Read manifest
const { readFileSync } = require("fs");

async function run() {
  const apps = await readFileSync("./appManifest.json");
}

run();
