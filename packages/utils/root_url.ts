
const { host } = window.location;
let domain: string = 'talkinggenie.com';
if (/tgenie.cn/i.test(host)) {
  domain = 'tgenie.cn';
}

// （dev、test、beta、alpha、www）.talkinggenie.com, 这几个环境地址和短域名才能访问到tts的合成播放，私有化没有tts合成权限
// 1.如果是本地调试——base默认是dev
// 2.如果是host中有xxx、history-xxx、ics-admin-xxx、xxx.tgenie.cn——base为对应能访问的环境地址
let base: string = '';
if (window.location.hostname === 'localhost' || /dev/i.test(host)) {
  base = `https://dev.${domain}`;
} else if (/test/i.test(host)) {
  base = `https://test.${domain}`;
} else if (/beta/i.test(host)) {
  base = `https://beta.${domain}`;
} else if (/alpha/i.test(host)) {
  base = `https://alpha.${domain}`;
} else {
  base = `https://www.${domain}`;
}

/* eslint-disable import/prefer-default-export */
export const BASE: string = base;
