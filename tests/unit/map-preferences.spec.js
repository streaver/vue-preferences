import { mapPreferences, DEFAULT_STORAGE_PREFIX } from '../../src/index';

describe('VuePreferences#mapPreferences', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  describe('using no global options', () => {
    describe('when using array syntax', () => {
      const preferenceNames = ['firstName', 'lastName'];

      let subject;

      beforeEach(() => {
        subject = mapPreferences(preferenceNames);
      });

      it('returns an object all the given properties and get/set functions for each preference', () => {
        preferenceNames.forEach(preferenceName => {
          const preference = subject[preferenceName];

          expect(preference).toBeDefined();
          expect(preference.get).toBeInstanceOf(Function);
          expect(preference.set).toBeInstanceOf(Function);
        });
      });

      it('saves the preference value to window.localStorage when executing the set function', () => {
        preferenceNames.forEach((preferenceName, index) => {
          const preference = subject[preferenceName];
          const preferenceKey = `${DEFAULT_STORAGE_PREFIX}:${preferenceName}`;

          preference.set(`Alice-${index}`);

          expect(JSON.parse(window.localStorage.getItem(preferenceKey))).toBe(
            `Alice-${index}`
          );
        });
      });

      it('obtains the preference value from window.localStorage when executing the get function', () => {
        preferenceNames.forEach((preferenceName, index) => {
          const preference = subject[preferenceName];
          const preferenceKey = `${DEFAULT_STORAGE_PREFIX}:${preferenceName}`;

          window.localStorage.setItem(preferenceKey, `Alice-${index}`);

          expect(preference.get(preferenceName)).toBe(`Alice-${index}`);
        });
      });
    });

    describe('when using Object syntax', () => {
      const preferencesObject = {
        firstName: {},
        lastName: {
          defaultValue: 'Sinclair',
        },
      };

      let subject;

      beforeEach(() => {
        subject = mapPreferences(preferencesObject);
      });

      it('returns an object all the given properties and get/set functions for each preference', () => {
        Object.keys(preferencesObject).forEach(preferenceName => {
          const preference = subject[preferenceName];

          expect(preference).toBeDefined();
          expect(preference.get).toBeInstanceOf(Function);
          expect(preference.set).toBeInstanceOf(Function);
        });
      });

      it('saves the preference value to window.localStorage when executing the set function', () => {
        Object.keys(preferencesObject).forEach((preferenceName, index) => {
          const preference = subject[preferenceName];
          const preferenceKey = `${DEFAULT_STORAGE_PREFIX}:${preferenceName}`;

          preference.set(`Alice-${index}`);

          expect(JSON.parse(window.localStorage.getItem(preferenceKey))).toBe(
            `Alice-${index}`
          );
        });
      });

      it('obtains the preference value from window.localStorage when executing the get function', () => {
        Object.keys(preferencesObject).forEach((preferenceName, index) => {
          const preference = subject[preferenceName];
          const preferenceKey = `${DEFAULT_STORAGE_PREFIX}:${preferenceName}`;

          window.localStorage.setItem(preferenceKey, `Alice-${index}`);

          expect(preference.get(preferenceName)).toBe(`Alice-${index}`);
        });
      });

      it('obtains the default preference value from window.localStorage when executing the get function', () => {
        Object.keys(preferencesObject).forEach(preferenceName => {
          const preference = subject[preferenceName];
          const defaultValue = preferencesObject[preferenceName].defaultValue;

          expect(preference.get(preferenceName)).toBe(defaultValue);
        });
      });
    });
  });
});
