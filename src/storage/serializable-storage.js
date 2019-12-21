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

    this.serializer = options.serializer || defaultSerializer;
    this.deserializer = options.deserializer || defaultDeserializer;
  }

  getItem(key) {
    return this.deserializer(super.getItem(key));
  }

  setItem(key, value) {
    return super.setItem(key, this.serializer(value));
  }
};
