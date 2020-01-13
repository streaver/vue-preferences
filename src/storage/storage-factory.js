import BaseStorage from './base-storage';
import DefaultableStorage from './defaultable-storage';
import NamespaceableStorage from './namespaceable-storage';
import SerializableStorage from './serializable-storage';
import ExpirableStorage from './expirable-storage';

export default class StorageFactory {
  static build(options = {}) {
    let storage = new BaseStorage(options.storage || window.localStorage);

    storage = new SerializableStorage(storage, {
      serializer: options.serializer,
      deserializer: options.deserializer,
    });

    if (options.namespace) {
      storage = new NamespaceableStorage(storage, options.namespace);
    }

    if (options.defaultValue) {
      storage = new DefaultableStorage(storage, options.defaultValue);
    }

    if (options.ttl || options.expiration) {
      storage = new ExpirableStorage(storage, options);
    }

    return storage;
  }
};
