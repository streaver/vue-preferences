import StorageFactory from './storage/storage-factory';
import { DEFAULT_REACTIVE_PROPERTIES_PREFIX } from './constants';

const defaultGlobalOptions = {
  reactive: true,
}

export default class PreferenceObject {
  constructor(name, options) {
    this.name = name;
    this.options = options;
    this.value = undefined;
    this.component = undefined;
    this.storage = undefined;
    this.initialized = false;
  }

  init(component = null) {
    if (!this.initialized) {
      this.options = {
        ...defaultGlobalOptions,
        ...PreferenceObject.globalOptions,
        ...this.options
      }

      this.component = component;
      this.storage = StorageFactory.build(this.options);

      this.initialized = true;
    }
  }

  get() {
    const value = this.storage.getItem(this.name);

    if (this._inVueContext()) {
      const reactiveObject = this.component[DEFAULT_REACTIVE_PROPERTIES_PREFIX];
      const reactiveValue = reactiveObject[this.name];

      return reactiveValue && this.options.reactive ? reactiveValue : value;
    }

    return value;
  }

  set(value) {
    this.value = value;

    if (this._inVueContext()) {
      const reactiveObject = this.component[DEFAULT_REACTIVE_PROPERTIES_PREFIX];
      this.component.$set(reactiveObject, this.name, value);
    }

    this.storage.setItem(this.name, value);
  }

  _inVueContext() {
    return this.component && this.component._isVue;
  }
}
