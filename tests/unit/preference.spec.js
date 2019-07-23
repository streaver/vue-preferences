import setupVue from '../utils/setup-vue';
import preference from '../../src/preference';
import {
  DEFAULT_STORAGE_PREFIX,
  DEFAULT_REACTIVE_PROPERTIES_PREFIX,
} from '../../src/constants';

describe('VuePreferences#preference', () => {
  const preferenceName = 'firstName';
  const preferenceKey = `${DEFAULT_STORAGE_PREFIX}:${preferenceName}`;

  let subject, vueMock;

  beforeEach(() => {
    window.localStorage.clear();
  });

  describe('using no options', () => {
    beforeEach(() => {
      subject = preference(preferenceName);

      vueMock = setupVue(subject);
    });

    afterEach(() => {
      vueMock.restore();
    });

    it('returns an object with get/set functions', () => {
      expect(subject.get).toBeInstanceOf(Function);
      expect(subject.set).toBeInstanceOf(Function);
    });

    it('set function saves the value to window.localStorage', () => {
      subject.set('Alice');

      expect(JSON.parse(window.localStorage.getItem(preferenceKey))).toBe(
        'Alice'
      );
    });

    it('get function obtains value from window.localStorage', () => {
      window.localStorage.setItem(preferenceKey, 'Alice');

      expect(subject.get()).toBe('Alice');
    });
  });

  describe('using defaultValue option', () => {
    beforeEach(() => {
      subject = preference(preferenceName, { defaultValue: 'Alice' });

      vueMock = setupVue(subject);
    });

    afterEach(() => {
      vueMock.restore();
    });

    it('returns an object with get/set functions', () => {
      expect(subject.get).toBeInstanceOf(Function);
      expect(subject.set).toBeInstanceOf(Function);
    });

    it('set function saves the value to window.localStorage', () => {
      subject.set('Bob');

      expect(JSON.parse(window.localStorage.getItem(preferenceKey))).toBe(
        'Bob'
      );
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
      expect(JSON.parse(window.localStorage.getItem(preferenceKey))).toBe(null);
    });
  });

  describe('using reactive option', () => {
    it('sets the reactive properties when reactivity is set to true', () => {
      subject = preference(preferenceName, {
        defaultValue: 'Alice',
        reactive: true,
      });

      vueMock = setupVue(subject);

      subject.set('Bob');

      expect(vueMock.setSpy).toHaveBeenCalledTimes(1);
      expect(subject.get()).toBe('Bob');
      expect(vueMock.wrapper.vm[DEFAULT_REACTIVE_PROPERTIES_PREFIX]).toEqual({
        [`${DEFAULT_STORAGE_PREFIX}:${preferenceName}`]: 'Bob',
      });
      expect(vueMock.getItemSpy).toHaveBeenCalledTimes(1);

      vueMock.restore();
    });

    it('does not set the reactive properties when reactivity is set to false', () => {
      subject = preference(preferenceName, {
        defaultValue: 'Alice',
        reactive: false,
      });

      vueMock = setupVue(subject);

      subject.set('Bob');

      expect(vueMock.setSpy).not.toHaveBeenCalled();
      expect(subject.get()).toBe('Bob');
      expect(vueMock.wrapper.vm[DEFAULT_REACTIVE_PROPERTIES_PREFIX]).toEqual(
        {}
      );
      expect(vueMock.getItemSpy).toHaveBeenCalledTimes(1);

      vueMock.restore();
    });
  });

  describe('saving any type of data', () => {
    beforeEach(() => {
      subject = preference('data');

      vueMock = setupVue(subject);
    });

    afterEach(() => {
      vueMock.restore();
    });

    it('saves and retrieves String values', () => {
      subject.set('Alice');

      expect(subject.get()).toBe('Alice');
    });

    // This is a special case where a user has modified localStorage
    // manually but we still want to be consistent with whatever is
    // returned
    it('saves and retrieves empty String value', () => {
      localStorage.setItem('vp:data', '');

      expect(subject.get()).toBe('');
    });

    it('saves and retrieves Number values', () => {
      subject.set(3.14);

      expect(subject.get()).toBe(3.14);
    });

    it('saves and retrieves Boolean values', () => {
      subject.set(false);

      expect(subject.get()).toBe(false);

      subject.set(true);

      expect(subject.get()).toBe(true);
    });

    it('saves and retrieves Array values', () => {
      subject.set([1, 'one', true, false]);

      expect(subject.get()).toMatchObject([1, 'one', true, false]);
    });

    it('saves and retrieves Object values', () => {
      subject.set({ name: 'Alice', darkMode: false });

      expect(subject.get()).toMatchObject({ name: 'Alice', darkMode: false });
    });
  });
});
