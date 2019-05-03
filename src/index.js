export const DEFAULT_STORAGE_PREFIX = 'vp';
export const DEFAULT_REACTIVE_PROPERTIES_PREFIX = `${DEFAULT_STORAGE_PREFIX}:tracked`;

function buildKey(name, prefix = DEFAULT_STORAGE_PREFIX) {
  return `${prefix}:${name}`;
}

function normalizeMap(map) {
  return Array.isArray(map)
    ? map.map(name => ({ name, options: {} }))
    : Object.keys(map).map(name => ({ name, options: map[name] }));
}

function mergeOptionsFor(name, globalOptions, specificOptions) {
  let options = specificOptions;

  if (typeof globalOptions === 'object') {
    options = { ...globalOptions[name], ...specificOptions };
  }

  return options;
}

function getPreference(key, options) {
  const value = window.localStorage.getItem(key);

  if (value === null) {
    return options.defaultValue;
  }

  try {
    return JSON.parse(value);
  } catch (e) {
    return value === '' ? value : value || options.defaultValue;
  }
}

function setPreference(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));

  return value;
}

function getTrackingProperty(component, key) {
  const trackingObject = component[DEFAULT_REACTIVE_PROPERTIES_PREFIX];

  return trackingObject ? trackingObject[key] : undefined;
}

function setTrackingProperty(component, key, value) {
  const trackingObject = component[DEFAULT_REACTIVE_PROPERTIES_PREFIX];

  component.$set(trackingObject, key, value);
}

function buildGetterFunction(name, key, opts, setupStatus) {
  return function() {
    const component = this || {};
    const options = mergeOptionsFor(name, component.$preferences, opts);
    const nonReactiveValue = getPreference(key, options);
    const reactiveValue = getTrackingProperty(component, key);

    return opts.reactive && setupStatus.isReactivitySetup
      ? reactiveValue
      : nonReactiveValue;
  };
}

function buildSetterFunction(name, key, opts, setupStatus) {
  return function(value) {
    const component = this || {};
    const options = mergeOptionsFor(name, component.$preferences, opts);

    setPreference(key, value);

    if (options.reactive) {
      setTrackingProperty(component, key, value);
      setupStatus.isReactivitySetup = true;
    }
  };
}

export function preference(name, opts = {}) {
  const key = buildKey(name);
  const setupStatus = { isReactivitySetup: false };

  return {
    get: buildGetterFunction(name, key, opts, setupStatus),
    set: buildSetterFunction(name, key, opts, setupStatus),
  };
}

export function mapPreferences(preferences) {
  const res = {};

  normalizeMap(preferences).forEach(({ name, options }) => {
    res[name] = preference(name, options);
  });

  return res;
}

function install(Vue) {
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
}

export default { install };
