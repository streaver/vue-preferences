import BaseStorage from '@vue-preferences/storage/base-storage';
import DefaultableStorage from '@vue-preferences/storage/defaultable-storage';
import NamespaceableStorage from '@vue-preferences/storage/namespaceable-storage';
import SerializableStorage from '@vue-preferences/storage/serializable-storage';
import ExpirableStorage from '@vue-preferences/storage/expirable-storage';

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
