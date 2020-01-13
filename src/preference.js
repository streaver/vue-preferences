import PreferenceObject from '@vue-preferences/preference-object'

export default function preference(name, options = {}) {
  const preference = new PreferenceObject(name, options);

  return {
    get() {
      const component = this;

      preference.init(this);

      return preference.get();
    },

    set(value) {
      const component = this;

      preference.init(this);

      return preference.set(value);
    },
  };
}
