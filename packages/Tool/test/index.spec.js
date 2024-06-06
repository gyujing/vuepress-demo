// import Tool from '..';
import { getObjectValue } from '..';

describe('Library Tool', () => {
  it('test getObjectValue', () => {
    const object = { obj: { name: '1' } };
    expect(getObjectValue(object, 'obj.name')).toBe('1');
    expect(getObjectValue(object, 'obj.age', 18)).toBe(18);
  });
});
