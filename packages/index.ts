// This file is auto gererated by build/build-entry.js
import { VueConstructor } from 'vue';
import AuthHandler from './AuthHandler';
import Tool from './Tool';
import Validate from './Validate';

declare global {
  interface Window {
    Vue?: VueConstructor;
  }
}

const components = [
  AuthHandler,
];

const libraries = [
  Tool,
  Validate,
];

const install = (Vue: VueConstructor) => {
  components.forEach((component) => {
    Vue.use(component);
  });
  libraries.forEach((library) => {
    Vue.prototype[`$${library.name}`] = library;
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  install,
  AuthHandler,
  Tool,
  Validate,
};

export default {
  install,
};
