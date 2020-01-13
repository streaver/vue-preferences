import BaseStorage from './base-storage';

export default class ExpirableStorage extends BaseStorage {
  constructor(underlyingStorage, options = {}) {
    super(underlyingStorage);

    this._ttl = options.ttl;
    this._expiration = options.expiration;

    if (!this._expirationTime()) {
      throw new TypeError('Please provide a valid ttl or expiration date/function');
    }
  }

  getItem(key) {
    const obj = super.getItem(key);

    if (this._isExpirable(obj)) {
      if (this._isExpired(obj)) {
        super.removeItem(key);

        return null;
      }

      return obj.value;
    }

    return obj;
  }

  setItem(key, value) {
    return super.setItem(key, this._expirableValue(value));
  }

  _isExpirable(value) {
    return typeof (value) === 'object' && value !== null && value.type === 'expirable';
  }

  _isExpired(value) {
    return typeof (value.expirationTime) === 'number' && (+new Date()) > value.expirationTime;
  }

  _expirableValue(value) {
    return {
      type: 'expirable',
      expirationTime: this._expirationTime(),
      value
    };
  }

  _expirationTime() {
    if (typeof (this._ttl) === 'number') {
      return this._ttl * 1000 + Date.now();
    }

    if (typeof (this._expiration) === 'function') {
      return this._expiration().getTime();
    }

    if (this._expiration instanceof Date) {
      return this._expiration.getTime();
    }
  }
};
