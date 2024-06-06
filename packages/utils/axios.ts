import axios from 'axios';
import { Message } from 'element-ui';

const instance = axios.create({
  withCredentials: true,
  timeout: 60000,
});


instance.interceptors.response.use(
  ({ data, config }) => {
    if (config && (config as any).resposeFormatType === 1) {
      if (data.code.toString() === '0' || data.code.toString() === '200') {
        return data.data;
      }
      if (data.code.toString() === '401') {
        Message.error(data.msg || data.message);
        return null;
      }
      Message.error(data.msg || data.message);
      return Promise.reject(new Error(`${data.code}:${data.msg || data.message}`));
    }
    if (!!config.responseType && config.responseType !== 'json') return data;

    const {
      code, msg, message, result, data: d,
    } = data;

    if (code >= 400 || Number(code) >= 400) throw new Error(msg || message);

    return result || d;
  },
  error => Promise.reject(error),
);

export default instance;
