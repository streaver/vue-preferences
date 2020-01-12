export default class BaseStorage {
  constructor(underlyingStorage) {
    if (!BaseStorage.isValidUnderlyingStorage(underlyingStorage)) {
      throw new TypeError('Please provide a valid underlying storage object');
    }

    this._underlyingStorage = underlyingStorage;
  }

  getItem(key) {
    return this._underlyingStorage.getItem(key);
  }

  setItem(key, value) {
    return this._underlyingStorage.setItem(key, value);
  }

  removeItem(key) {
    return this._underlyingStorage.removeItem(key);
  }

  static isValidUnderlyingStorage(storage) {
    const hasValidGetItemFunction = typeof storage.getItem === 'function';
    const hasValidSetItemFunction = typeof storage.setItem === 'function';
    const hasValidRemoveItemFunction = typeof storage.removeItem === 'function';

    console.assert(
      hasValidGetItemFunction,
      "You must provide a 'getItem' function as part of the storage"
    );
    console.assert(
      hasValidSetItemFunction,
      "You must provide a 'setItem' function as part of the storage"
    );
    console.assert(
      hasValidRemoveItemFunction,
      "You must provide a 'removeItem' function as part of the storage"
    );

    return [
      hasValidGetItemFunction,
      hasValidSetItemFunction,
      hasValidRemoveItemFunction,
    ].every(Boolean);
  }
};
