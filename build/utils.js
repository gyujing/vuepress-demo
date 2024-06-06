const fs = require('fs');
const path = require('path');

const external = ['mixins', 'style', 'utils', 'index.ts', 'index.scss', 'base.scss'];
const library = ['Validate', 'Tool'];

const exists = p => ((fs.existsSync || path.existsSync)(p));
const isDir = p => exists(p) && fs.statSync(p).isDirectory();
const isFile = p => exists(p) && fs.statSync(p).isFile();
const isScript = p => /\.(js|jsx|ts|tsx)$/.test(p);
const isVue = p => /\.(vue)$/.test(p);
const isSpec = p => /\.spec\.(js|ts)/.test(p);
const components = function () {
  return fs.readdirSync(path.resolve(__dirname, '../packages'))
    .filter(dirName => !external.includes(dirName) && !library.includes(dirName));
};
const libraries = function () {
  return fs.readdirSync(path.resolve(__dirname, '../packages'))
    .filter(dirName => library.includes(dirName));
};
const styles = function () {
  return fs.readdirSync(path.resolve(__dirname, '../packages'))
    .filter(dirName => !external.includes(dirName));
};

module.exports = {
  libraries,
  components,
  styles,
  exists,
  isDir,
  isFile,
  isScript,
  isVue,
  isSpec,
};
