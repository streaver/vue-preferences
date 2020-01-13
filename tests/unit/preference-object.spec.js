import PreferenceObject from '@vue-preferences/preference-object';
import StorageFactory from '@vue-preferences/storage/storage-factory';
import { DEFAULT_REACTIVE_PROPERTIES_PREFIX } from '@vue-preferences/constants';

describe('PreferenceObject', () => {
  describe('#constructor', () => {
    it('sets the initial properties of the preference', () => {
      const options = {
        option1: 1,
        option2: 2,
      };

      const preferenceObject = new PreferenceObject('somePreference', options);

      expect(preferenceObject._name).toEqual('somePreference');
      expect(preferenceObject._options).toEqual(options);
      expect(preferenceObject._value).toEqual(undefined);
      expect(preferenceObject._component).toEqual(undefined);
      expect(preferenceObject._storage).toEqual(undefined);
      expect(preferenceObject._initialized).toEqual(false);
    });
  });

  describe('#init', () => {
    let spy;

    beforeEach(() => {
      spy = jest.spyOn(StorageFactory, 'build');
    });

    afterEach(() => {
      spy.mockRestore();
    });

    it('is an idempotent method', () => {
      const preferenceObject = new PreferenceObject('somePreference', {});

      preferenceObject.init({});
      preferenceObject.init({});

      expect(StorageFactory.build).toBeCalledTimes(1);
    });

    it('has reactive as default global option', () => {
      const preferenceObject = new PreferenceObject('somePreference', {});

      preferenceObject.init({});

      expect(preferenceObject._options).toEqual({ reactive: true });
    });

    it('merges the options to the globalOptions', () => {
      const globalOptions = { globalOption1: 'global1', globalOption2: 'global2' };
      const localOptions = { localOption: 'localOption', globalOption1: 'global1Override' };

      PreferenceObject._globalOptions = globalOptions

      const preferenceObject = new PreferenceObject('somePreference', localOptions);

      preferenceObject.init({});

      expect(preferenceObject._options).toEqual({ reactive: true, ...globalOptions, ...localOptions });
    });

    it('saves the component into the preference object', () => {
      const preferenceObject = new PreferenceObject('somePreference', {});

      preferenceObject.init({});

      expect(preferenceObject._component).toEqual({});
    })
  });

  describe('#get', () => {
    describe('when using the reactive option', () => {
      it('returns the value from the component if reactive', () => {
        const preferenceObject = new PreferenceObject('somePreference', {
          reactive: true,
          storage: { getItem: jest.fn().mockReturnValue('abc'), setItem: jest.fn(), removeItem: jest.fn() },
        });

        const component = {
          [DEFAULT_REACTIVE_PROPERTIES_PREFIX]: {
            somePreference: 123
          },
          _isVue: true,
        }

        preferenceObject.init(component);

        expect(preferenceObject.get()).toEqual(123);
      });

      it('returns the value from the storage if not reactive', () => {
        const preferenceObject = new PreferenceObject('somePreference', {
          reactive: false,
          storage: { getItem: jest.fn().mockReturnValue('abc'), setItem: jest.fn(), removeItem: jest.fn() },
        });

        const component = {
          [DEFAULT_REACTIVE_PROPERTIES_PREFIX]: {
            somePreference: 123
          },
        }

        preferenceObject.init(component);

        expect(preferenceObject.get()).toEqual('abc');
      });
    });
  });

  describe('#set', () => {
    it('sets the value into the component', () => {
      const preferenceObject = new PreferenceObject('somePreference', {
        storage: { getItem: jest.fn(), setItem: jest.fn(), removeItem: jest.fn() },
      });

      const component = {
        [DEFAULT_REACTIVE_PROPERTIES_PREFIX]: {},
        $set: jest.fn(),
        _isVue: true
      }

      preferenceObject.init(component);
      preferenceObject.set(123)

      expect(component.$set).toHaveBeenCalledWith({}, 'somePreference', 123);
    });

    it('sets the value into the storage', () => {
      const storage = { getItem: jest.fn(), setItem: jest.fn(), removeItem: jest.fn() };

      const preferenceObject = new PreferenceObject('somePreference', { storage });

      const component = {
        [DEFAULT_REACTIVE_PROPERTIES_PREFIX]: {},
        $set: jest.fn()
      }

      preferenceObject.init(component);
      preferenceObject.set(123)

      expect(storage.setItem).toHaveBeenCalledWith('somePreference', "123");
    });
  });
});
