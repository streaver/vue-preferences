import mapPreferences from '../../src/map-preferences';

describe('mapPreferences', () => {
  describe('when called with an array of names', () => {
    it('returns an object with the computed property', () => {
      const computedProperties = mapPreferences(['someProperty1', 'someProperty2']);

      expect(computedProperties.someProperty1.get).toBeInstanceOf(Function);
      expect(computedProperties.someProperty1.set).toBeInstanceOf(Function);

      expect(computedProperties.someProperty2.get).toBeInstanceOf(Function);
      expect(computedProperties.someProperty2.set).toBeInstanceOf(Function);
    });
  });

  describe('when called with an object of names/options', () => {
    it('returns an object with the computed property', () => {
      const computedProperties = mapPreferences({
        someProperty1: { default: 'abc' },
        someProperty2: { reactive: false },
      });

      expect(computedProperties.someProperty1.get).toBeInstanceOf(Function);
      expect(computedProperties.someProperty1.set).toBeInstanceOf(Function);

      expect(computedProperties.someProperty2.get).toBeInstanceOf(Function);
      expect(computedProperties.someProperty2.set).toBeInstanceOf(Function);
    });
  });
});
