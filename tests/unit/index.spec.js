import VuePreferences, { preference, mapPreferences } from '../../src/index';
import install from '../../src/install';
import preferenceExport from '../../src/preference';
import mapPreferencesExport from '../../src/map-preferences';

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
