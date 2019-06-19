import { globalOptions } from './global-options';
import {
  DEFAULT_STORAGE_PREFIX,
  DEFAULT_REACTIVE_PROPERTIES_PREFIX,
} from './constants';

const DEFAULT_OPTIONS = { reactive: true };

function buildKey(name, prefix = DEFAULT_STORAGE_PREFIX) {
  return `${prefix}:${name}`;
}

function mergeOptionsFor(name, genericOptions, specificOptions) {
  let options = specificOptions;

  if (typeof genericOptions === 'object') {
    options = { ...genericOptions[name], ...specificOptions };
  }

  return options;
}

function getPreference(key, options) {
  const value = globalOptions.storage.getItem(key);

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
  globalOptions.storage.setItem(key, JSON.stringify(value));

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

export default function preference(name, opts = {}) {
  const options = { ...DEFAULT_OPTIONS, ...opts };
  const key = buildKey(name);
  const setupStatus = { isReactivitySetup: false };

  return {
    get: buildGetterFunction(name, key, options, setupStatus),
    set: buildSetterFunction(name, key, options, setupStatus),
  };
}
