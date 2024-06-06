// 导入组件，组件必须声明 name
import test from './index.vue';
import sfc from '../utils/sfc';

const { def } = sfc('test');
export default def(test);
