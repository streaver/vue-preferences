import BaseStorage from '@vue-preferences/storage/base-storage';

export default class DefaultableStorage extends BaseStorage {
  constructor(underlyingStorage, defaultValue) {
    super(underlyingStorage);

    this._defaultValue = defaultValue;
  }

  getItem(key) {
    const value = super.getItem(key);

    return value === null ? this._defaultValue : value;
  }
};
