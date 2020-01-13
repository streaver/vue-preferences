import DefaultableStorage from '../../../src/storage/defaultable-storage';

describe('DefaultableStorage', () => {
  let validStorage;
  let defaultableStorage;

  beforeEach(() => {
    validStorage = { getItem: jest.fn().mockReturnValue(null), setItem: jest.fn(), removeItem: jest.fn() };
    defaultableStorage = new DefaultableStorage(validStorage, 'default value');
  });

  describe('#getItem', () => {
    it('returns the default value when no value is set', () => {
      expect(defaultableStorage.getItem('someKey')).toEqual('default value');
    });

    it('returns the storage value when it is set', () => {
      validStorage.getItem.mockReturnValue('storage value');

      expect(defaultableStorage.getItem('someKey')).toEqual('storage value');
    });
  });

  describe('#setItem', () => {
    it('calls the underlying storage with the same key/value', () => {
      defaultableStorage.setItem('someKey', 123);

      expect(validStorage.setItem).toHaveBeenCalledWith('someKey', 123);
    });
  });
});
