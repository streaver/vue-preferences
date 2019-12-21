import BaseStorage from './base-storage';
import DefaultableStorage from './defaultable-storage';
import NamespaceableStorage from './namespaceable-storage';
import SerializableStorage from './serializable-storage';

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

    if (options.default) {
      storage = new DefaultableStorage(storage, options.default);
    }

    return storage;
  }
};
