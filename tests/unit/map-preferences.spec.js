import setupVue from '../utils/setup-vue';
import {
  mapPreferences,
  DEFAULT_STORAGE_PREFIX,
  DEFAULT_REACTIVE_PROPERTIES_PREFIX,
} from '../../src/index';

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

          const mockVue = setupVue(preference);

          expect(preference).toBeDefined();
          expect(preference.get).toBeInstanceOf(Function);
          expect(preference.set).toBeInstanceOf(Function);

          mockVue.restore();
        });
      });

      it('saves the preference value to window.localStorage when executing the set function', () => {
        preferenceNames.forEach((preferenceName, index) => {
          const preference = subject[preferenceName];
          const preferenceKey = `${DEFAULT_STORAGE_PREFIX}:${preferenceName}`;

          const mockVue = setupVue(preference);

          preference.set(`Alice-${index}`);

          expect(JSON.parse(window.localStorage.getItem(preferenceKey))).toBe(
            `Alice-${index}`
          );

          mockVue.restore();
        });
      });

      it('obtains the preference value from window.localStorage when executing the get function', () => {
        preferenceNames.forEach((preferenceName, index) => {
          const preference = subject[preferenceName];
          const preferenceKey = `${DEFAULT_STORAGE_PREFIX}:${preferenceName}`;

          const mockVue = setupVue(preference);

          window.localStorage.setItem(preferenceKey, `Alice-${index}`);

          expect(preference.get(preferenceName)).toBe(`Alice-${index}`);

          mockVue.restore();
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

          const mockVue = setupVue(preference);

          expect(preference).toBeDefined();
          expect(preference.get).toBeInstanceOf(Function);
          expect(preference.set).toBeInstanceOf(Function);

          mockVue.restore();
        });
      });

      it('saves the preference value to window.localStorage when executing the set function', () => {
        Object.keys(preferencesObject).forEach((preferenceName, index) => {
          const preference = subject[preferenceName];
          const preferenceKey = `${DEFAULT_STORAGE_PREFIX}:${preferenceName}`;

          const mockVue = setupVue(preference);

          preference.set(`Alice-${index}`);

          expect(JSON.parse(window.localStorage.getItem(preferenceKey))).toBe(
            `Alice-${index}`
          );

          mockVue.restore();
        });
      });

      it('obtains the preference value from window.localStorage when executing the get function', () => {
        Object.keys(preferencesObject).forEach((preferenceName, index) => {
          const preference = subject[preferenceName];
          const preferenceKey = `${DEFAULT_STORAGE_PREFIX}:${preferenceName}`;

          const mockVue = setupVue(preference);

          window.localStorage.setItem(preferenceKey, `Alice-${index}`);

          expect(preference.get(preferenceName)).toBe(`Alice-${index}`);

          mockVue.restore();
        });
      });

      it('obtains the default preference value from window.localStorage when executing the get function', () => {
        Object.keys(preferencesObject).forEach(preferenceName => {
          const preference = subject[preferenceName];
          const defaultValue = preferencesObject[preferenceName].defaultValue;

          const mockVue = setupVue(preference);

          expect(preference.get(preferenceName)).toBe(defaultValue);

          mockVue.restore();
        });
      });

      it('does not set up reactivity for the preferences does not require it', () => {
        const preferencesObject = {
          firstName: {
            reactive: true,
          },
          lastName: {
            reactive: false,
          },
        };

        subject = mapPreferences(preferencesObject);

        Object.keys(preferencesObject).forEach((preferenceName, index) => {
          const preference = subject[preferenceName];
          const reactive = preferencesObject[preferenceName].reactive;
          const { wrapper, setSpy, getItemSpy, restore } = setupVue(preference);

          preference.set(`Alice - ${index}`);

          expect(preference.get()).toBe(`Alice - ${index}`);

          if (reactive) {
            expect(setSpy).toHaveBeenCalledTimes(1);
            expect(wrapper.vm[DEFAULT_REACTIVE_PROPERTIES_PREFIX]).toEqual({
              [`${DEFAULT_STORAGE_PREFIX}:${preferenceName}`]: `Alice - ${index}`,
            });
          } else {
            expect(wrapper.vm[DEFAULT_REACTIVE_PROPERTIES_PREFIX]).toEqual({});
          }

          expect(getItemSpy).toHaveBeenCalledTimes(1);

          restore();
        });
      });
    });
  });
});
