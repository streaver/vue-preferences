import * as constants from '@vue-preferences/constants';

describe('constants', () => {
  it('exports DEFAULT_REACTIVE_PROPERTIES_PREFIX', () => {
    expect(constants.DEFAULT_REACTIVE_PROPERTIES_PREFIX).toBe('vp:tracked');
  });
});
