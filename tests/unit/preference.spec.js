import { preference, DEFAULT_STORAGE_PREFIX } from '../../src/index';

describe('VuePreferences#preference', () => {
  const preferenceName = 'firstName';
  const preferenceKey = `${DEFAULT_STORAGE_PREFIX}:${preferenceName}`;

  let subject;

  beforeEach(() => {
    window.localStorage.clear();
  });

  describe('using no options', () => {
    beforeEach(() => {
      subject = preference(preferenceName);
    });

    it('returns an object with get/set functions', () => {
      expect(subject.get).toBeInstanceOf(Function);
      expect(subject.set).toBeInstanceOf(Function);
    });

    it('set function saves the value to window.localStorage', () => {
      subject.set('Alice');

      expect(window.localStorage.getItem(preferenceKey)).toBe('Alice');
    });

    it('get function obtains value from window.localStorage', () => {
      window.localStorage.setItem(preferenceKey, 'Alice');

      expect(subject.get()).toBe('Alice');
    });
  });

  describe('using defaultValue option', () => {
    beforeEach(() => {
      subject = preference(preferenceName, { defaultValue: 'Alice' });
    });

    it('returns an object with get/set functions', () => {
      expect(subject.get).toBeInstanceOf(Function);
      expect(subject.set).toBeInstanceOf(Function);
    });

    it('set function saves the value to window.localStorage', () => {
      subject.set('Bob');

      expect(window.localStorage.getItem(preferenceKey)).toBe('Bob');
    });

    it('get function obtains value from window.localStorage', () => {
      window.localStorage.setItem(preferenceKey, 'Bob');

      expect(subject.get()).toBe('Bob');
    });

    it('get function returns defaultValue if not defined in window.localStorage', () => {
      expect(subject.get()).toBe('Alice');
    });

    it('get function does not save the defaultValue when returning it', () => {
      expect(subject.get()).toBe('Alice');
      expect(window.localStorage.getItem(preferenceKey)).toBe(null);
    });
  });
});
