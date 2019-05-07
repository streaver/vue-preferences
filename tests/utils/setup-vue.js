import { createLocalVue, shallowMount } from '@vue/test-utils';
import VuePreferences from '../../src/index';

export default function setupVue(subject) {
  const localVue = createLocalVue();

  localVue.use(VuePreferences);

  const Paragraph = localVue.component('Paragraph', {
    name: 'Paragraph',
    template: '<p>Hello!</p>',
  });

  const wrapper = shallowMount(Paragraph, { localVue });

  const setSpy = jest.spyOn(wrapper.vm, '$set');
  const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');

  subject.get = subject.get.bind(wrapper.vm);
  subject.set = subject.set.bind(wrapper.vm);

  return {
    getItemSpy,
    setSpy,
    wrapper,
    restore: () => {
      setSpy.mockRestore();
      getItemSpy.mockRestore();
    },
  };
}
