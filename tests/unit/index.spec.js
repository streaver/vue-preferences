import VuePreferences, { preference, mapPreferences } from '@vue-preferences/index';
import install from '@vue-preferences/install';
import preferenceExport from '@vue-preferences/preference';
import mapPreferencesExport from '@vue-preferences/map-preferences';

describe('VuePreferences', () => {
  it('exports the install function', () => {
    expect(VuePreferences.install).toEqual(install);
  });

  it('exports the preference function', () => {
    expect(preference).toEqual(preferenceExport);
  });

  it('exports the mapPreferences function', () => {
    expect(mapPreferences).toEqual(mapPreferencesExport);
  });
});
