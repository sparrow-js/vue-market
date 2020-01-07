const fetchpackage = require('./fetchPackage');
const projectDir = process.cwd();
const path = require('path');
const fs = require('fs-extra');

async function generateJson () {
  const result = await fetchpackage();
  const blocksJson = path.join(projectDir, 'block.json');
  fs.writeFile(blocksJson, JSON.stringify(result), 'utf8');
}

generateJson();