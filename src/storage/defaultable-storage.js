import BaseStorage from './base-storage';

export default class DefaultableStorage extends BaseStorage {
  constructor(underlyingStorage, defaultValue) {
    super(underlyingStorage);

    this.defaultValue = defaultValue;
  }

  getItem(key) {
    const value = super.getItem(key);

    return value === null ? this.defaultValue : value;
  }

  setItem(key, value) {
    return super.setItem(key, value);
  }
};
