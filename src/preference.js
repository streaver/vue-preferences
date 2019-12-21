import PreferenceObject from './preference-object'

export default function preference(name, options = {}) {
  const preference = new PreferenceObject(name, options);

  return {
    get() {
      const component = this;

      preference.init(component);

      return preference.get();
    },

    set(value) {
      const component = this;

      preference.init(component);

      return preference.set(value);
    },
  };
}
