import { isNull, setValidData } from '../Validate';
import { IObject } from '../utils';
/**
 * 下载文件
 */
export const downloadFile = (data: Blob | ArrayBuffer, name: string) => {
  try {
    const iconv = require('iconv-lite');
    iconv.skipDecodeWarning = true;
    const fileName = iconv.decode(name, 'utf8');
    const arr = fileName.split('.');
    let blob = null;
    if (arr.length === 2) {
      if (arr[1] === 'xls' || arr[1] === 'xlsx') {
        blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      } else if (arr[1] === 'audio/mpeg') {
        blob = new Blob([data], { type: 'audio/mpeg' });
      } else if (arr[1] === 'zip') {
        blob = new Blob([data], { type: 'application/zip' });
      } else if (arr[1] === 'csv') {
        blob = new Blob([`\ufeff${data}`], { type: 'text/csv' });
      } else if (arr[1] === 'wav') {
        blob = new Blob([data], { type: 'application/wav' });
      } else {
        blob = new Blob([data]);
      }
    } else {
      blob = new Blob([data]);
    }
    if (!isNull(window.navigator.msSaveOrOpenBlob)) {
      navigator.msSaveBlob(blob, fileName);
      return;
    }
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = URL.createObjectURL(blob);
    try {
      link.download = decodeURIComponent(fileName);
    } catch {
      link.download = fileName;
    }
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
    }, 0);
  } catch (e) {
    //
  }
};

/**
 * 根据链接下载文件
 */
export const downloadLink = (uri: string, name: string = '') => {
  const ac = document.createElement('a');
  ac.href = uri;
  ac.download = name;
  document.body.appendChild(ac);
  ac.click();
  setTimeout(() => {
    document.body.removeChild(ac);
  }, 0);
};

/**
 * 根据值获取对象文本
 */
export const getDictText = (val: string | number, list: Array<IObject>) => {
  if (isNull(val) || isNull(list) || !Array.isArray(list)) {
    return '';
  }
  const keys = Object.keys(list[0]);
  const obj = list.find(item => !isNull(item[keys[0]]) && (item[keys[0]].toString() === val.toString()));
  if (obj) {
    return !isNull(obj[keys[1]]) ? obj[keys[1]] : '';
  }
  return '';
};

/**
 * 安全获取深层元素的方法
 * obj：最外层对象
 * key：要获取的深层元素，每层健值通过.连接
 * defaultVal: 默认值
 */
export const getObjectValue = (obj: Object, key: string, defaultVal: any = null) => {
  if (isNull(obj) || isNull(key)) {
    return defaultVal;
  }
  const nameSpace = key.split('.') || [];
  let response = null;
  let object = JSON.parse(JSON.stringify(obj));
  for (let i = 0; i < nameSpace.length; i += 1) {
    response = object[nameSpace[i]];
    if (isNull(response, false)) {
      return defaultVal;
    }
    object = response;
  }
  return setValidData(response, defaultVal);
};

/**
 * 从数组中递归寻找对象或值
 * list：要查找的数组
 * childrenKey：要递归的数组对象健值
 * key: 要查找的数组对象健值，可为空
 * val：要查找的值
 */
export const getDeepValue = (list: Array<any>, childrenKey: string, key: string, val: string): any => {
  try {
    if (isNull(list) || !Array.isArray(list)) {
      return null;
    }
    const obj = list.find((item) => {
      if (key === '') {
        return item === val;
      }
      return item[key] === val;
    });
    if (!isNull(obj)) {
      return obj;
    }
    if (childrenKey) {
      for (let i = 0; i < list.length; i += 1) {
        if (!isNull(list[i][childrenKey])) {
          const obj1 = getDeepValue(list[i][childrenKey], childrenKey, key, val);
          if (!isNull(obj1)) {
            return obj1;
          }
        }
      }
    }
    return null;
  } catch {
    return {};
  }
};

/**
 * 从数组中获取分层的名字组合。如某公司/某部门
 * list：要查找的数组
 * childrenKey：要递归的数组对象健值
 * labelKey：要返回的名字健值
 * key: 要查找的数组对象健值
 * val：要查找的值
 */
export const getLayerLabel = (list: Array<any>, childrenKey: string, labelKey: string, key: string, val: string): string => {
  try {
    if (isNull(list) || !Array.isArray(list)) {
      return '';
    }
    const itemIndex = list.findIndex(item => item[key] === val);
    if (itemIndex > -1) {
      return list[itemIndex][labelKey] || '';
    }
    for (let i = 0; i < list.length; i += 1) {
      if (Array.isArray(list[i][childrenKey])) {
        const children = getLayerLabel(list[i][childrenKey], childrenKey, labelKey, key, val);
        if (children) {
          return `${list[i][labelKey]}/${children}`;
        }
      }
    }
    return '';
  } catch {
    return '';
  }
};

// 深copy
export const deepClone = (obj: any = null) => {
  if (obj === null || !obj) {
    return obj;
  }
  // 判断 是要深拷贝 对象 还是 数组
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    const target: IObject = {};
    const keys = Object.keys(obj);
    keys.forEach((key) => {
      if (obj[key] && typeof obj[key] === 'object') {
        target[key] = deepClone(obj[key]);
      } else {
        target[key] = obj[key];
      }
    });
    return target;
  } if (Array.isArray(obj)) {
    // 数组同理
    const arr: Array<any> = [];
    obj.forEach((item, index) => {
      if (item && typeof item === 'object') {
        arr[index] = deepClone(item);
      } else {
        arr[index] = item;
      }
    });
    return arr;
  }
  return obj;
};

// 复制文本（支持换行）
export const textCopy = (textContent: String) => {
  // textarea不支持复制空格 所以要区分为textarea与input
  const nodeType: any = textContent.indexOf('\n') >= 0 ? 'textarea' : 'input';
  const oInput = document.createElement(nodeType);
  oInput.value = textContent;
  document.body.appendChild(oInput);
  oInput.select();
  document.execCommand('Copy');
  oInput.remove();
};

export default {
  name: 'tool',
  downloadFile,
  downloadLink,
  getDictText,
  getObjectValue,
  getDeepValue,
  deepClone,
  textCopy,
};
