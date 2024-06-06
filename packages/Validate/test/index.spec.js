/* eslint-disable import/no-named-as-default-member */
import Validate from '..';

describe('Library Validate', () => {
  it('test isRegExp', () => {
    expect(Validate.isRegExp(/^\d*$/)).toBe(true);
    expect(Validate.isRegExp('')).toBe(false);
  });

  it('test isIp', () => {
    expect(Validate.isIp('176.23.4.5')).toBe(true);
    expect(Validate.isIp('142.555.6.7')).toBe(false);
  });

  it('test isDomain', () => {
    expect(Validate.isDomain('baidu.com')).toBe(true);
    expect(Validate.isDomain('http://baidu.com')).toBe(false);
  });

  it('test isMobilePhone', () => {
    expect(Validate.isMobilePhone('13532345678')).toBe(true);
    expect(Validate.isMobilePhone('16654345678')).toBe(true);
    expect(Validate.isMobilePhone('132323222')).toBe(false);
  });

  it('test isFixPhone', () => {
    expect(Validate.isFixPhone('010-43542345')).toBe(true);
    expect(Validate.isFixPhone('0310-0453234')).toBe(true);
    expect(Validate.isFixPhone('010-0334956-091')).toBe(true);
    expect(Validate.isFixPhone('0311-03334956-09')).toBe(false);
  });

  it('test isEmail', () => {
    expect(Validate.isEmail('a@bg.com')).toBe(true);
    expect(Validate.isEmail('a@b.com')).toBe(false);
    expect(Validate.isEmail('zb.com')).toBe(false);
    expect(Validate.isEmail('1#4@bg.com')).toBe(false);
    expect(Validate.isEmail('a@bg')).toBe(false);
  });

  it('test isUrl', () => {
    expect(Validate.isUrl('http://baidu.com')).toBe(true);
    expect(Validate.isUrl('https://baidu.com')).toBe(true);
    expect(Validate.isUrl('baidu.com')).toBe(false);
  });

  it('test isNumber', () => {
    expect(Validate.isNumber(3)).toBe(true);
    expect(Validate.isNumber('3')).toBe(true);
    expect(Validate.isNumber(3.23, 1, 4, 2, 3)).toBe(true);
    expect(Validate.isNumber(3.23, 1, 2)).toBe(false);
    expect(Validate.isNumber(3.23, 0, 0, 3, 3)).toBe(false);
  });

  it('test isNull', () => {
    expect(Validate.isNull([])).toBe(true);
    expect(Validate.isNull({})).toBe(true);
    expect(Validate.isNull('')).toBe(true);
    expect(Validate.isNull(false)).toBe(false);
    expect(Validate.isNull(0)).toBe(false);
  });

  it('test setValidData', () => {
    expect(Validate.setValidData([], [2])).toStrictEqual([2]);
    expect(Validate.setValidData({}, 3)).toBe(3);
    expect(Validate.setValidData('', 'r')).toBe('r');
    expect(Validate.setValidData('', 'r', false)).toBe('');
    expect(Validate.setValidData(false, true)).toBe(false);
    expect(Validate.setValidData(0, 1)).toBe(0);
  });
});
