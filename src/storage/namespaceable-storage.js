import BaseStorage from './base-storage';

export const DEFAULT_NAMESPACE = 'vp';

export default class NamespaceableStorage extends BaseStorage {
  constructor(underlyingStorage, namespace) {
    super(underlyingStorage);

    this.namespace = namespace;
  }

  getItem(key) {
    const namespacedKey = this.buildNamespacedKey(key);

    return super.getItem(namespacedKey);
  }

  setItem(key, value) {
    const namespacedKey = this.buildNamespacedKey(key);

    return super.setItem(namespacedKey, value);
  }

  buildNamespacedKey(key) {
    return Boolean(this.namespace) ? `${this.namespace}:${key}` : key;
  }
};
