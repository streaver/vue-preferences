import { createLocalVue, shallowMount } from '@vue/test-utils';
import { DEFAULT_REACTIVE_PROPERTIES_PREFIX } from '../../src/constants';
import PreferenceObject from '../../src/preference-object';

import install from '../../src/install';

describe('install', () => {
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    console.assert = jest.fn();
  });

  it('adds a data mixin with the required properties for setting up reactive preferences', () => {
    install(localVue);

    const Paragraph = localVue.component('Paragraph', {
      name: 'Paragraph',
      template: '<p>Hello!</p>',
    });

    const wrapper = shallowMount(Paragraph, { localVue });

    expect(wrapper.vm.$data).toEqual({
      [DEFAULT_REACTIVE_PROPERTIES_PREFIX]: {},
    });
  });

  it('saves the provided options in PreferenceObject._globalOptions', () => {
    const storage = { getItem: jest.fn(), setItem: jest.fn() };
    const namespace = 'namespace1';

    install(localVue, { storage, namespace });

    expect(PreferenceObject._globalOptions).toEqual({ storage, namespace });
  });
});
