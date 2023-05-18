import StorageFactory from '@vue-preferences/storage/storage-factory';
import { DEFAULT_REACTIVE_PROPERTIES_PREFIX } from '@vue-preferences/constants';

const defaultGlobalOptions = {
  reactive: true,
}

export default class PreferenceObject {
  constructor(name, options) {
    this._name = name;
    this._options = options;
    this._value = undefined;
    this._component = undefined;
    this._storage = undefined;
    this._initialized = false;
  }

  init(component = null) {
    if (!this._initialized) {
      this._options = {
        ...defaultGlobalOptions,
        ...PreferenceObject._globalOptions,
        ...this._options
      }

      this._component = component;
      this._storage = StorageFactory.build(this._options);

      this._initialized = true;
    }
  }

  get() {
    const value = this._storage.getItem(this._name);

    if (this._inVueContext()) {
      const reactiveObject = this._component[DEFAULT_REACTIVE_PROPERTIES_PREFIX];
      const reactiveValue = reactiveObject[this._name];

      return reactiveValue && this._options.reactive ? reactiveValue : value;
    }

    return value;
  }

  set(value) {
    this._value = value;

    if (this._inVueContext()) {
      const reactiveObject = this._component[DEFAULT_REACTIVE_PROPERTIES_PREFIX];
      this._component.$set(reactiveObject, this._name, value);
    }

    this._storage.setItem(this._name, value);
  }

  _inVueContext() {
    return this._component && (this._component._isVue || this._component.__isVue);
  }
}
