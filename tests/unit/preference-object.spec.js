import PreferenceObject from '../../src/preference-object';
import StorageFactory from '../../src/storage/storage-factory';
import { DEFAULT_REACTIVE_PROPERTIES_PREFIX } from '../../src/constants';

describe('PreferenceObject', () => {
  describe('#constructor', () => {
    it('sets the initial properties of the preference', () => {
      const options = {
        option1: 1,
        option2: 2,
      };

      const preferenceObject = new PreferenceObject('somePreference', options);

      expect(preferenceObject.name).toEqual('somePreference');
      expect(preferenceObject.options).toEqual(options);
      expect(preferenceObject.value).toEqual(undefined);
      expect(preferenceObject.component).toEqual(undefined);
      expect(preferenceObject.storage).toEqual(undefined);
      expect(preferenceObject.initialized).toEqual(false);
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

      expect(preferenceObject.options).toEqual({ reactive: true });
    });

    it('merges the options to the globalOptions', () => {
      const globalOptions = { globalOption1: 'global1', globalOption2: 'global2' };
      const localOptions = { localOption: 'localOption', globalOption1: 'global1Override' };

      PreferenceObject.globalOptions = globalOptions

      const preferenceObject = new PreferenceObject('somePreference', localOptions);

      preferenceObject.init({});

      expect(preferenceObject.options).toEqual({ reactive: true, ...globalOptions, ...localOptions });
    });

    it('saves the component into the preference object', () => {
      const preferenceObject = new PreferenceObject('somePreference', {});

      preferenceObject.init({});

      expect(preferenceObject.component).toEqual({});
    })
  });

  describe('#get', () => {
    describe('when using the reactive option', () => {
      it('returns the value from the component if reactive', () => {
        const preferenceObject = new PreferenceObject('somePreference', {
          reactive: true,
          storage: { getItem: jest.fn().mockReturnValue('abc'), setItem: jest.fn() },
        });

        const component = {
          [DEFAULT_REACTIVE_PROPERTIES_PREFIX]: {
            somePreference: 123
          },
        }

        preferenceObject.init(component);

        expect(preferenceObject.get()).toEqual(123);
      });

      it('returns the value from the storage if not reactive', () => {
        const preferenceObject = new PreferenceObject('somePreference', {
          reactive: false,
          storage: { getItem: jest.fn().mockReturnValue('abc'), setItem: jest.fn() },
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
        storage: { getItem: jest.fn(), setItem: jest.fn() },
      });

      const component = {
        [DEFAULT_REACTIVE_PROPERTIES_PREFIX]: {},
        $set: jest.fn()
      }

      preferenceObject.init(component);
      preferenceObject.set(123)

      expect(component.$set).toHaveBeenCalledWith({}, 'somePreference', 123);
    });

    it('sets the value into the storage', () => {
      const storage = { getItem: jest.fn(), setItem: jest.fn() };

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
