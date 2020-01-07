const path = require('path');
const fs = require('fs-extra');
const utils = require('./utils');

const blocksDir = path.join(__dirname, '..');

const packages = [];

const fetchPackage = async (blockName) => {
  const blocktPath = path.join(blocksDir, blockName);
  const packagePath = path.join(blocktPath, 'package.json');
  const result = await fs.readFile(packagePath, 'utf8');
  return JSON.parse(result);
}
const fetchPackages = async () => {
  const blockNames = await utils.getBlockNames();
  
  await Promise.all(
    blockNames.map(async name => {
      const result = await fetchPackage(name);
      packages.push(result);
    })
  );
  return packages;
}

module.exports = fetchPackages;