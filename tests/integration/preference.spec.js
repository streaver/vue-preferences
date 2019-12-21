import setupVue from '../utils/setup-vue';
import preference from '../../src/preference';

describe('preference', () => {
  const preferenceName = 'firstName';

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

    it('set function saves the value to window.localStorage', () => {
      subject.set('Alice');

      expect(JSON.parse(window.localStorage.getItem(preferenceName))).toBe(
        'Alice'
      );
    });

    it('get function obtains value from window.localStorage', () => {
      window.localStorage.setItem(preferenceName, 'Alice');

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

    it('set function saves the value to window.localStorage', () => {
      subject.set('Bob');

      expect(JSON.parse(window.localStorage.getItem(preferenceName))).toBe(
        'Bob'
      );
    });

    it('get function obtains value from window.localStorage', () => {
      window.localStorage.setItem(preferenceName, 'Bob');

      expect(subject.get()).toBe('Bob');
    });

    it('get function returns defaultValue if not defined in window.localStorage', () => {
      expect(subject.get()).toBe('Alice');
    });

    it('get function does not save the defaultValue when returning it', () => {
      expect(subject.get()).toBe('Alice');
      expect(JSON.parse(window.localStorage.getItem(preferenceName))).toBe(null);
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

    it('saves and retrieves empty String value', () => {
      localStorage.setItem('data', '');

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
