import { createLocalVue, shallowMount } from '@vue/test-utils';
import VuePreferences, {
  preference,
  DEFAULT_STORAGE_PREFIX,
  DEFAULT_REACTIVE_PROPERTIES_PREFIX,
} from '../../src/index';

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
    let wrapper, setSpy, getItemSpy;

    beforeEach(() => {
      const localVue = createLocalVue();

      localVue.use(VuePreferences);

      const Paragraph = localVue.component('Paragraph', {
        name: 'Paragraph',
        template: '<p>Hello!</p>',
      });

      wrapper = shallowMount(Paragraph, { localVue });

      setSpy = jest.spyOn(wrapper.vm, '$set');
      getItemSpy = jest.spyOn(Storage.prototype, 'getItem');

      subject = preference(preferenceName, {
        defaultValue: 'Alice',
        reactive: true,
      });

      subject.get = subject.get.bind(wrapper.vm);
      subject.set = subject.set.bind(wrapper.vm);
    });

    afterEach(() => {
      setSpy.mockRestore();
      getItemSpy.mockRestore();
    });

    it('sets the reactive properties', () => {
      subject.set('Bob');

      expect(setSpy).toHaveBeenCalledTimes(1);
      expect(subject.get()).toBe('Bob');
      expect(wrapper.vm[DEFAULT_REACTIVE_PROPERTIES_PREFIX]).toEqual({
        [`${DEFAULT_STORAGE_PREFIX}:${preferenceName}`]: 'Bob',
      });
      expect(getItemSpy).not.toHaveBeenCalled();
    });
  });

  describe('saving any type of data', () => {
    beforeEach(() => {
      subject = preference('data');
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
