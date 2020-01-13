import { when } from 'jest-when'
import { advanceBy, advanceTo, clear } from 'jest-date-mock';

import ExpirableStorage from '../../../src/storage/expirable-storage';

describe('ExpirableStorage', () => {
  let validStorage;

  beforeEach(() => {
    validStorage = { getItem: jest.fn(), setItem: jest.fn(), removeItem: jest.fn() };

    advanceTo(new Date(2020, 1, 12, 10, 45, 0));
  });

  afterEach(() => {
    clear();
  })

  it('throws an exception if none of ttl/expiration are valid', () => {
    expect(
      () => new ExpirableStorage(validStorage, { fakeTimeOption: 5 })
    ).toThrowError(new TypeError('Please provide a valid ttl or expiration date/function'));
  });

  describe('#getItem', () => {
    it('returns the value if preference is not expirable', () => {
      const expirableStorage = new ExpirableStorage(validStorage, { ttl: 5 });

      when(validStorage.getItem).calledWith('someKey').mockReturnValue('value1');

      expect(expirableStorage.getItem('someKey')).toEqual('value1');
    });

    it('returns null if the preference is expired', () => {
      const expirableStorage = new ExpirableStorage(validStorage, { ttl: 5 });

      when(validStorage.getItem).calledWith('someKey').mockReturnValue({
        type: 'expirable',
        expirationTime: Date.now() + 5000,
        value: 'expired value',
      });

      advanceBy(5001);

      expect(expirableStorage.getItem('someKey')).toEqual(null);
    });

    it('removes the preference from the storage if expired', () => {
      const expirableStorage = new ExpirableStorage(validStorage, { ttl: 5 });

      when(validStorage.getItem).calledWith('someKey').mockReturnValue({
        type: 'expirable',
        expirationTime: Date.now() + 5000,
        value: 'expired value',
      });

      advanceBy(5001);

      expirableStorage.getItem('someKey')

      expect(validStorage.removeItem).toHaveBeenCalledWith('someKey');
    });

    it('returns the preference value if not expired', () => {
      const expirableStorage = new ExpirableStorage(validStorage, { ttl: 5 });

      when(validStorage.getItem).calledWith('someKey').mockReturnValue({
        type: 'expirable',
        expirationTime: Date.now() + 5000,
        value: 'value1',
      });

      advanceBy(4500);

      expect(expirableStorage.getItem('someKey')).toEqual('value1');
    });
  });

  describe('#setItem', () => {
    describe('when using the ttl option', () => {
      it('wraps the preference value with the expiration data', () => {
        const expirableStorage = new ExpirableStorage(validStorage, { ttl: 5 });

        expirableStorage.setItem('someKey', 'value1');

        expect(validStorage.setItem).toHaveBeenCalledWith('someKey', {
          type: 'expirable',
          expirationTime: Date.now() + 5000,
          value: 'value1',
        });
      });
    })

    describe('when using the expiration option', () => {
      describe('when passing a function', () => {
        it('wraps the preference value with the expiration data', () => {
          const expiration = new Date(2020, 1, 12, 10, 45, 15);
          const expirableStorage = new ExpirableStorage(validStorage, {
            expiration: () => expiration,
          });

          expirableStorage.setItem('someKey', 'value1');

          expect(validStorage.setItem).toHaveBeenCalledWith('someKey', {
            type: 'expirable',
            expirationTime: expiration.getTime(),
            value: 'value1',
          });
        });
      });

      describe('when passing a Date', () => {
        it('wraps the preference value with the expiration data', () => {
          const expiration = new Date(2020, 1, 12, 10, 45, 15);
          const expirableStorage = new ExpirableStorage(validStorage, {
            expiration,
          });

          expirableStorage.setItem('someKey', 'value1');

          expect(validStorage.setItem).toHaveBeenCalledWith('someKey', {
            type: 'expirable',
            expirationTime: expiration.getTime(),
            value: 'value1',
          });
        });
      });
    });
  });
});
