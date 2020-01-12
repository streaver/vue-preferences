import BaseStorage from './base-storage';

export const DEFAULT_NAMESPACE = 'vp';

export default class NamespaceableStorage extends BaseStorage {
  constructor(underlyingStorage, namespace) {
    super(underlyingStorage);

    this._namespace = namespace;
  }

  getItem(key) {
    const namespacedKey = this.buildNamespacedKey(key);

    return super.getItem(namespacedKey);
  }

  setItem(key, value) {
    const namespacedKey = this.buildNamespacedKey(key);

    return super.setItem(namespacedKey, value);
  }

  removeItem(key) {
    const namespacedKey = this.buildNamespacedKey(key);

    return super.removeItem(namespacedKey);
  }

  buildNamespacedKey(key) {
    return Boolean(this._namespace) ? `${this._namespace}:${key}` : key;
  }
};
