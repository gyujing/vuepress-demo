import lib from '../../packages/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "../../packages/index.scss";

export default ({
  Vue,
  options,
  router,
  siteData }) => {
  Vue.use(ElementUI);
  Vue.use(lib);
};
