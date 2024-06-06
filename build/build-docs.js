const fs = require('fs');
const path = require('path');

const external = ['.vuepress', 'README.md'];
const getMds = function () {
  return fs.readdirSync(path.resolve(__dirname, '../docs'))
    .filter(dirName => !external.includes(dirName));
};
const changeNormal = (filePath) => {
  const testHtml = fs.readFileSync(filePath).toString();
  const arr = testHtml.split('\n');
  let start = -1;
  let end = -1;
  let res = [];
  for (let j = 0; j < arr.length; j += 1) {
    res.push(arr[j]);
    if (arr[j].match(/<template>/)) {
      start = j;
    } else if (arr[j].match(/<\/style>/)) {
      end = j;
      if (end > start && start > -1) {
        res = [...res, '::: details 点击查看代码', '', '```vue', ...arr.slice(start, end + 1), '```', ':::'];
        start = -1;
      }
    }
  }
  fs.writeFileSync(filePath, res.join('\n'));
};
const changeVue = (filePath, childPath) => {
  const testHtml = fs.readFileSync(filePath).toString();
  if (!testHtml.match(/from-vue\s*\/>/)) {
    changeNormal(filePath);
    return;
  }
  const arr = testHtml.split('\n');
  let res = [];
  for (let j = 0; j < arr.length; j += 1) {
    res.push(arr[j]);
    if (arr[j].match(/from-vue\s*\/>/)) {
      const p = arr[j].match(/^<(\S+)/);
      if (p) {
        const vueHtml = fs.readFileSync(path.resolve(__dirname, `../docs/${childPath}/${p[1]}.vue`)).toString();
        res = [...res, '::: details 点击查看代码', '', '```vue', vueHtml, '```', ':::'];
      }
    }
  }
  fs.writeFileSync(filePath, res.join('\n'));
};

const mds = getMds();

for (let i = 0; i < mds.length; i += 1) {
  const filePath = path.resolve(__dirname, `../docs/${mds[i]}/README.md`);
  changeVue(filePath, mds[i]);
}
