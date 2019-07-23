import { createLocalVue, shallowMount } from '@vue/test-utils';
import { globalOptions } from '../../src/global-options';

import install from '../../src/install';

describe('install', () => {
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    globalOptions.storage = window.localStorage;
    console.assert = jest.fn();
  });

  it('adds an empty object to the $preferences property in the Vue instance', () => {
    install(localVue);

    expect(localVue.prototype.$preferences).toEqual({});
  });

  it('adds a data mixin with the required properties for setting up reactive preferences', () => {
    install(localVue);

    const Paragraph = localVue.component('Paragraph', {
      name: 'Paragraph',
      template: '<p>Hello!</p>',
    });

    const wrapper = shallowMount(Paragraph, { localVue });

    expect(wrapper.vm.$data).toEqual({
      'vp:tracked': {},
    });
  });

  it('it replaces the default storage with the provided storage when valid', () => {
    const storage = { getItem: function() {}, setItem: function() {} };

    install(localVue, { storage });

    expect(globalOptions.storage).toEqual(storage);
  });

  it('it ignores the provided storage when invalid', () => {
    const storage = {};

    install(localVue, { storage });

    expect(globalOptions.storage).toBe(window.localStorage);
  });
});
