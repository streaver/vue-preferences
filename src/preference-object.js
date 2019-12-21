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

  init(component) {
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
    const reactiveObject = this.component[DEFAULT_REACTIVE_PROPERTIES_PREFIX];
    const value = this.storage.getItem(this.name);
    const reactiveValue = reactiveObject[this.name];

    return reactiveValue && this.options.reactive ? reactiveValue : value;
  }

  set(value) {
    const reactiveObject = this.component[DEFAULT_REACTIVE_PROPERTIES_PREFIX];

    this.value = value;
    this.component.$set(reactiveObject, this.name, value);
    this.storage.setItem(this.name, value);
  }
}
