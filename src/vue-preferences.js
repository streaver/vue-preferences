const LOCAL_STORAGE_PREFIX = "vp";

function buildKey(name, prefix = LOCAL_STORAGE_PREFIX) {
  return `${prefix}:${name}`;
}

function normalizeMap(map) {
  return Array.isArray(map)
    ? map.map(name => ({ name, options: {} }))
    : Object.keys(map).map(name => ({ name, options: map[name] }));
}

function mergeOptionsFor(name, globalOptions, specificOptions) {
  let options = specificOptions;

  if (typeof globalOptions === "object") {
    options = { ...globalOptions[name], ...specificOptions };
  }

  return options;
}

function getPreference(key, options) {
  return window.localStorage.getItem(key) || options.defaultValue;
}

function setPreference(key, value) {
  window.localStorage.setItem(key, value);

  return value;
}

function preference(name, opts = {}) {
  console.log(name);
  const key = buildKey(name);

  return {
    get() {
      const options = mergeOptionsFor(name, this.$preferences, opts);

      return getPreference(key, options);
    },

    set(value) {
      return setPreference(key, value);
    }
  };
}

function mapPreferences(preferences) {
  const res = {};

  normalizeMap(preferences).forEach(({ name, options }) => {
    res[name] = preference(name, options);
  });

  return res;
}

export { preference, mapPreferences };
