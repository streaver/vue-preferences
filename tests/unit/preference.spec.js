import preference from '@vue-preferences/preference';

describe('preference', () => {
  it('returns a computed property (object with get and set methods)', () => {
    const computedProperty = preference('somePreference', { default: 'abc' });

    expect(computedProperty.get).toBeInstanceOf(Function);
    expect(computedProperty.set).toBeInstanceOf(Function);
  });
});
