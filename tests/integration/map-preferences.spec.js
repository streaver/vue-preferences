import setupVue from '../utils/setup-vue';
import mapPreferences from '@vue-preferences/map-preferences';

describe('mapPreferences', () => {
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

      it('saves the preference value to window.localStorage when executing the set function', () => {
        preferenceNames.forEach((preferenceName, index) => {
          const preference = subject[preferenceName];
          const mockVue = setupVue(preference);

          preference.set(`Alice-${index}`);

          expect(JSON.parse(window.localStorage.getItem(preferenceName))).toBe(
            `Alice-${index}`
          );

          mockVue.restore();
        });
      });

      it('obtains the preference value from window.localStorage when executing the get function', () => {
        preferenceNames.forEach((preferenceName, index) => {
          const preference = subject[preferenceName];
          const mockVue = setupVue(preference);

          window.localStorage.setItem(preferenceName, `Alice-${index}`);

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

      it('saves the preference value to window.localStorage when executing the set function', () => {
        Object.keys(preferencesObject).forEach((preferenceName, index) => {
          const preference = subject[preferenceName];
          const mockVue = setupVue(preference);

          preference.set(`Alice-${index}`);

          expect(JSON.parse(window.localStorage.getItem(preferenceName))).toBe(
            `Alice-${index}`
          );

          mockVue.restore();
        });
      });

      it('obtains the preference value from window.localStorage when executing the get function', () => {
        Object.keys(preferencesObject).forEach((preferenceName, index) => {
          const preference = subject[preferenceName];
          const mockVue = setupVue(preference);

          window.localStorage.setItem(preferenceName, `Alice-${index}`);

          expect(preference.get(preferenceName)).toBe(`Alice-${index}`);

          mockVue.restore();
        });
      });

      it('obtains the default preference value from window.localStorage when executing the get function', () => {
        Object.keys(preferencesObject).forEach(preferenceName => {
          const preference = subject[preferenceName];
          const defaultValue = preferencesObject[preferenceName].defaultValue || null;
          const mockVue = setupVue(preference);

          expect(preference.get(preferenceName)).toBe(defaultValue);

          mockVue.restore();
        });
      });
    });
  });
});
