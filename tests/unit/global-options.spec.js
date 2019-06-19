import { globalOptions, isValidStorage } from '../../src/global-options';

describe('#globalOptions', () => {
  describe('storage', () => {
    it('has window.localStorage as default value', () => {
      expect(globalOptions.storage).toBe(window.localStorage);
    });
  });
});

describe('#isValidStorage', () => {
  beforeEach(() => {
    console.assert = jest.fn();
  });

  it('returns false when provided storage does not include a getItem function', () => {
    const storage = { setItem: function() {} };

    expect(isValidStorage(storage)).toBe(false);
  });

  it('returns false when provided storage does not include a setItem function', () => {
    const storage = { getItem: function() {} };

    expect(isValidStorage(storage)).toBe(false);
  });

  it('returns true when provided storage includes a setItem and getItem function', () => {
    const storage = { getItem: function() {}, setItem: function() {} };

    expect(isValidStorage(storage)).toBe(true);
  });

  it('console asserts that storage needs getItem/setItem', () => {
    isValidStorage({});

    expect(console.assert).toHaveBeenCalledWith(
      false,
      "You must provide a 'getItem' function as part of the storage"
    );

    expect(console.assert).toHaveBeenCalledWith(
      false,
      "You must provide a 'setItem' function as part of the storage"
    );
  });
});
