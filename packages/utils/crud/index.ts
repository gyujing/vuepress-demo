import { isNull } from '../../Validate';
import { IObject } from '..';

// eslint-disable-next-line import/prefer-default-export
export const setComponentData = (type: string, options: IObject) => {
  if (isNull(type)) {
    return '';
  }
  if (['el-checkbox', 'gu-checkbox'].includes(type)) {
    return [];
  }
  if (['gu-select', 'el-select'].includes(type) && options && options.multiple) {
    return [];
  }
  if (options && ['daterange', 'timerange', 'datetimerange'].includes(options.type)) {
    return [];
  }
  if (['el-switch', 'gu-switch', 'el-input-number'].includes(type)) {
    return 0;
  }
  return '';
};
