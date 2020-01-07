import BaseStorage from './base-storage';

export default class SerializableStorage extends BaseStorage {
  constructor(underlyingStorage, options = {}) {
    super(underlyingStorage);

    const defaultSerializer = (data) => {
      return JSON.stringify(data);
    };

    const defaultDeserializer = (data) => {
      try {
        return JSON.parse(data);
      } catch (e) {
        return data;
      }
    };

    this._serializer = options.serializer || defaultSerializer;
    this._deserializer = options.deserializer || defaultDeserializer;
  }

  getItem(key) {
    return this._deserializer(super.getItem(key));
  }

  setItem(key, value) {
    return super.setItem(key, this._serializer(value));
  }
};
