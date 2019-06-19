import { globalOptions, isValidStorage } from './global-options';

function install(Vue, options = {}) {
  Vue.prototype.$preferences = {};

  // We need to have one object to which we can dynamically add
  // the the values of the preferences so we can use Vue's reactivity
  // system to track changes. This object cannot be added on run-time, but
  // it can be modified.
  Vue.mixin({
    data() {
      return {
        'vp:tracked': {},
      };
    },
  });

  if (options.storage && isValidStorage(options.storage)) {
    globalOptions.storage = options.storage;
  }
}

export default install;
