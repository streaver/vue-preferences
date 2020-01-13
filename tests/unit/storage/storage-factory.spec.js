import StorageFactory from '../../../src/storage/storage-factory';
import BaseStorage from '../../../src/storage/base-storage';
import DefaultableStorage from '../../../src/storage/defaultable-storage';
import NamespaceableStorage from '../../../src/storage/namespaceable-storage';
import SerializableStorage from '../../../src/storage/serializable-storage';
import ExpirableStorage from '../../../src/storage/expirable-storage';

describe('StorageFactory', () => {
  let underlyingStorage;
  let storage;

  beforeEach(() => {
    underlyingStorage = { getItem: jest.fn(), setItem: jest.fn(), removeItem: jest.fn() };

    window.localStorage = underlyingStorage;
  });

  describe('.build', () => {
    describe('when no options are given', () => {
      beforeEach(() => {
        storage = StorageFactory.build();
      });

      it('sets up window.localStorage as the underlying storage', () => {
        expect(storage._underlyingStorage).toBeInstanceOf(BaseStorage);
        expect(storage._underlyingStorage._underlyingStorage).toEqual(window.localStorage);
      });

      it('sets up a SerializableStorage with the default options', () => {
        expect(storage).toBeInstanceOf(SerializableStorage);
        expect(storage._serializer).not.toEqual(undefined);
        expect(storage._deserializer).not.toEqual(undefined);
      });
    });

    describe('when a storage option is given', () => {
      beforeEach(() => {
        storage = StorageFactory.build({ storage: { ...underlyingStorage, id: 1 } });
      });

      it('sets up the provided storage as the underlying storage', () => {
        expect(storage._underlyingStorage).toBeInstanceOf(BaseStorage);
        expect(storage._underlyingStorage._underlyingStorage.id).toEqual(1);
      });
    });

    describe('when a serializer option is given', () => {
      let serializer = jest.fn();

      beforeEach(() => {
        storage = StorageFactory.build({ serializer });
      });

      it('sets up the serializer on the SerializableStorage storage', () => {
        expect(storage).toBeInstanceOf(SerializableStorage);
        expect(storage._serializer).toEqual(serializer);
      });
    });

    describe('when a deserializer option is given', () => {
      let deserializer = jest.fn();

      beforeEach(() => {
        storage = StorageFactory.build({ deserializer });
      });

      it('sets up the deserializer on the SerializableStorage storage', () => {
        expect(storage).toBeInstanceOf(SerializableStorage);
        expect(storage._deserializer).toEqual(deserializer);
      });
    });

    describe('when a namespace option is given', () => {
      beforeEach(() => {
        storage = StorageFactory.build({ namespace: 'namespace1' });
      });

      it('sets up a NamespaceableStorage', () => {
        expect(storage).toBeInstanceOf(NamespaceableStorage);
        expect(storage._namespace).toEqual('namespace1');
      });
    });

    describe('when a defaultValue option is given', () => {
      beforeEach(() => {
        storage = StorageFactory.build({ defaultValue: 'abc' });
      });

      it('sets up a DefaultableStorage', () => {
        expect(storage).toBeInstanceOf(DefaultableStorage);
        expect(storage._defaultValue).toEqual('abc');
      });
    });

    describe('when a ttl option is given', () => {
      beforeEach(() => {
        storage = StorageFactory.build({ ttl: 5 });
      });

      it('sets up a ExpirableStorage', () => {
        expect(storage).toBeInstanceOf(ExpirableStorage);
        expect(storage._ttl).toEqual(5);
      });
    });

    describe('when a expiration option is given', () => {
      const expiration = new Date();

      beforeEach(() => {
        storage = StorageFactory.build({ expiration });
      });

      it('sets up a ExpirableStorage', () => {
        expect(storage).toBeInstanceOf(ExpirableStorage);
        expect(storage._expiration).toEqual(expiration);
      });
    });
  });
});
