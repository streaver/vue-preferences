import PreferenceObject from './preference-object';
import { DEFAULT_REACTIVE_PROPERTIES_PREFIX } from './constants';

function install(Vue, options = {}) {
  // We need to have one object to which we can dynamically add
  // the values of the preferences so we can use Vue's reactivity
  // system to track changes. This object cannot be added on run-time, but
  // it can be modified.
  // See https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats

  Vue.mixin({
    data() {
      return {
        [DEFAULT_REACTIVE_PROPERTIES_PREFIX]: {},
      };
    },
  });

  PreferenceObject._globalOptions = options;
}

export default install;
