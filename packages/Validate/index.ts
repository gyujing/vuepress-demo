import { CallBackType } from '../../typings/Validate.d';
// 判断数据类型
export const isRegExp = (v:any) => Object.prototype.toString.call(v) === '[object RegExp]';
// 是否正确的IP
// eslint-disable-next-line max-len
export const isIp = (ip:string) => /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(ip);
// 是否正确的域名
export const isDomain = (domain:string) => /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/.test(domain);
// 是否正确的手机号码
export const isMobilePhone = (phone:string) => /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[589])\d{8}$/.test(phone);
// 是否正确的座机
export const isFixPhone = (phone:string) => /^((0\d{2,3})-?)(\d{7,8})(-(\d{3,}))?$/.test(phone);
// 是否正确的邮箱
export const isEmail = (email :string) => /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(email);
// 是否正确的url地址
export const isUrl = (url:string) => /^(https?):\/\/[\w-]+(\.[\w-]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/.test(url);

/**
 * 是否正确的数字范围和格式
 * @param {*} value 要验证的值
 * @param {*} min 最小范围（包含）
 * @param {*} max 最大范围 （包含）最大最小值相同不验证范围
 * @param {*} digitsmin 最小小数位数（包含）
 * @param {*} digitsmax 最大小数位数（包含）
 */
export const isNumber = (value:number, min = 0, max = 0, digitsmin = 0, digitsmax = 0) => {
  if (typeof min !== 'number' || typeof max !== 'number' || typeof digitsmin !== 'number' || typeof digitsmax !== 'number') {
    return false;
  }
  const format = new RegExp(`^\\d+(\\.\\d{${digitsmin},${digitsmax}})?$`);
  if (min === max) {
    return format.test(value.toString());
  }
  return format.test(value.toString()) && value <= max && value >= min;
};

/**
 * 变量是否为空（null、空数组、空对象、空格等）
 * @param val 变量
 * @params includeEmpty 是否包含空数组、空对象、空格的判断，默认包含
 * @returns 是否为空
 */
export const isNull = (val:any, includeEmpty:boolean = true) => {
  if (typeof val === 'boolean' || typeof val === 'number' || typeof val === 'function') {
    return false;
  }
  if (val === 'null' || val == null || val === 'undefined' || val === undefined) {
    return true;
  }
  if (includeEmpty) {
    if (val instanceof Array && val.length === 0) {
      return true;
    }
    if (val instanceof Object && Object.keys(val).length === 0) {
      return true;
    }
    if (val === '') {
      return true;
    }
  }
  return false;
};

// 设置默认值
export const setValidData = (val:any, dafult:any, includeEmpty:boolean = true) => {
  try {
    if (typeof val === 'boolean') {
      return val;
    }
    return !isNull(val, includeEmpty) ? val : dafult;
  } catch (e) {
    return dafult;
  }
};

/**
 *  以下为form的自定义校验规则
 */
const validNumber = (errMsg:string, min = 0, max = 0, digitsmin = 0, digitsmax = 0) => (rule:any, value:any, callback:CallBackType) => {
  if (!isNull(value) && !isNumber(value, min, max, digitsmin, digitsmax)) {
    return callback(new Error(errMsg));
  }
  return callback();
};
// 是否正确的手机或座机
const validPhone = (rule:any, value:any, callback:CallBackType) => {
  if (!isNull(value) && !isMobilePhone(value) && !isFixPhone(value)) {
    return callback(new Error('格式错误'));
  }
  return callback();
};

const validFormat = (type:string) => (rule:any, value:any, callback:CallBackType) => {
  if (isNull(value)) {
    return callback();
  }
  try {
    // eslint-disable-next-line no-new-func
    const func = new Function(`return is${type.charAt(0).toUpperCase()}${type.slice(1)}`);
    if (typeof func === 'function' && !func(value)) {
      return callback(new Error('格式错误'));
    }
    return callback();
  } catch (e) {
    return callback();
  }
};

const validForm = {
  required: {
    required: true, message: '必填字段',
  },
  requiredDate: {
    type: 'date', required: true, message: '必填字段',
  },
  requiredArray: {
    type: 'array', required: true, message: '必填字段',
  },
  numeric: {
    pattern: /^\d*$/,
    message: '必须为数字',
  },
  english: {
    pattern: /^[a-zA-Z]*$/,
    message: '必须为英文',
  },
  format: (type :string) => ({ // 验证ip、手机、座机等，看该文件最开始定义了哪些函数
    validator: validFormat(type),
  }),
  phone: { // 验证手机或座机
    validator: validPhone,
  },
  charNumber: {
    pattern: /^[a-zA-Z0-9]*$/,
    message: '只能包含字母或数字',
  },
  // 验证数据格式
  number: (errMsg:string, min = 0, max = 0, digitsmin = 0, digitsmax = 0) => ({
    validator: validNumber(errMsg, min, max, digitsmin, digitsmax),
  }),
};

export default {
  name: 'validate',
  validForm,
  isRegExp,
  isIp, // 是否正确的IP
  isDomain, // 是否正确的域名
  isMobilePhone, // 是否正确的手机号码
  isFixPhone, // 是否正确的座机
  isEmail, // 是否正确的邮箱
  isUrl, // 是否正确的url地址
  isNumber,
  isNull,
  setValidData,
};
