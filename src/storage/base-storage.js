export default class BaseStorage {
  constructor(underlyingStorage) {
    if (!BaseStorage.isValidUnderlyingStorage(underlyingStorage)) {
      throw new TypeError('Please provide a valid underlying storage object');
    }

    this.underlyingStorage = underlyingStorage;
  }

  getItem(key) {
    return this.underlyingStorage.getItem(key);
  }

  setItem(key, value) {
    return this.underlyingStorage.setItem(key, value);
  }

  static isValidUnderlyingStorage(storage) {
    const hasValidGetItemFunction = typeof storage.getItem === 'function';
    const hasValidSetItemFunction = typeof storage.setItem === 'function';

    console.assert(
      hasValidGetItemFunction,
      "You must provide a 'getItem' function as part of the storage"
    );
    console.assert(
      hasValidSetItemFunction,
      "You must provide a 'setItem' function as part of the storage"
    );

    return hasValidGetItemFunction && hasValidSetItemFunction;
  }
};
