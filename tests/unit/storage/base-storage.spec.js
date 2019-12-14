import BaseStorage from '../../../src/storage/base-storage';

describe('BaseStorage', () => {
  const validStorage = { getItem: jest.fn(), setItem: jest.fn() };
  const onlyGetStorage = { getItem: jest.fn() };
  const onlySetStorage = { setItem: jest.fn() };
  const noGetNoSetStorage = {};

  beforeEach(() => {
    console.assert = jest.fn();
  });

  afterEach(() => {
    console.assert.mockRestore();
  })

  describe('constructor', () => {
    it('throws an error when invalid storage is provided', () => {
      expect(
        () => new BaseStorage(noGetNoSetStorage)
      ).toThrowError(new TypeError('Please provide a valid underlying storage object'));
    });

    it('does not throw error if storage is valid', () => {
      expect(
        () => new BaseStorage(validStorage)
      ).not.toThrowError(new TypeError('Please provide a valid underlying storage object'));
    });
  });

  describe('#getItem', () => {
    it('calls the underlying storage with the same key', () => {
      const baseStorage = new BaseStorage(validStorage);

      baseStorage.getItem('someKey');

      expect(validStorage.getItem).toHaveBeenCalledWith('someKey');
    });
  });

  describe('#setItem', () => {
    it('calls the underlying storage with the same key/value', () => {
      const baseStorage = new BaseStorage(validStorage);

      baseStorage.setItem('someKey', 123);

      expect(validStorage.setItem).toHaveBeenCalledWith('someKey', 123);
    });
  });

  describe('.isValidUnderlyingStorage', () => {
    it('returns false when provided storage does not include a getItem function', () => {
      expect(BaseStorage.isValidUnderlyingStorage(onlySetStorage)).toBe(false);
    });

    it('returns false when provided storage does not include a setItem function', () => {
      expect(BaseStorage.isValidUnderlyingStorage(onlyGetStorage)).toBe(false);
    });

    it('returns true when provided storage includes a setItem and getItem function', () => {
      expect(BaseStorage.isValidUnderlyingStorage(validStorage)).toBe(true);
    });

    it('console asserts that storage needs getItem', () => {
      BaseStorage.isValidUnderlyingStorage(onlySetStorage);

      expect(console.assert).toHaveBeenCalledWith(
        false,
        "You must provide a 'getItem' function as part of the storage"
      );
    });

    it('console asserts that storage needs setItem', () => {
      BaseStorage.isValidUnderlyingStorage(onlyGetStorage);

      expect(console.assert).toHaveBeenCalledWith(
        false,
        "You must provide a 'setItem' function as part of the storage"
      );
    });
  });
});
