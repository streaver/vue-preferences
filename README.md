# Vue Preferences

<p align="center">
  <img src="https://user-images.githubusercontent.com/11605133/56131403-aec11f00-5f5d-11e9-8df7-ce60eda7dfa7.png" height="150px">
  <p align="center">The coolest and easiest way to manage your user's preferences on the client side with your preferred storage.<p>

  <p align="center">
    <a href="https://npmjs.org/package/vue-preferences">
      <img src="https://img.shields.io/npm/v/vue-preferences.svg" />
    </a>
    <a href="https://circleci.com/gh/streaver/vue-preferences/tree/master">
      <img src="https://circleci.com/gh/streaver/vue-preferences/tree/master.svg?style=shield" />
    </a>
    <a href="https://codeclimate.com/github/streaver/vue-preferences/maintainability">
      <img src="https://api.codeclimate.com/v1/badges/e6725f51619a0c309f80/maintainability" />
    </a>
    <a href="https://codeclimate.com/github/streaver/vue-preferences/test_coverage">
      <img src="https://api.codeclimate.com/v1/badges/e6725f51619a0c309f80/test_coverage" />
    </a>
    <a href="https://github.com/streaver/vue-preferences/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/streaver/vue-preferences.svg" />
    </a>
  </p>
</p>

## Motivation

Many times happens that you want to handle some persistent state on your application but you find that doing an actual call to your back-end is like "killing a mosquito with a bazooka". For those scenarios, we decided to create the `vue-preferences` library.

With `vue-preferences`, you can keep some state of your app on the client side by using any storage strategy you find suitable, as a default we use [window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) under the hood. This way you ensure your UX keeps consistent while at the same time avoiding simple but annoying calls to your back-end. You can set some user preferences such as `theme color`, `users' default`, `hidden elements (after user opted-in)`, `table sorting`, and many others you can imagine with great simplicity.

## Table of content

* [Installation](#installation)
* [Usage](#usage)
* [Options](#options)
* [Contributing](#contributing)
* [Credits](#credits)

## Installation

If you prefer `yarn`:

```
$ yarn add vue-preferences --save
```

or with `npm`:

```
$ npm install vue-preferences --save
```

## Usage

You can define your `vue-preferences` in many ways. You can create them one by one, many at once and also with or without default values. Let's see what this means!

But first, remember to install the plugin before using it with:

```javascript
import VuePreferences from 'vue-preferences';

Vue.use(VuePreferences);

new Vue({
  render: h => h(App),
}).$mount('#app');
```

This only needs to be done once, in the `main.js` or `index.js` file of your app, where you mount the Vue app for the first time.

### Declaring vue-preferences

#### Single preference at a time

Here you'll see how to create a single preference at a time.

Basically, you would do something like:

```js
  import { preference } from 'vue-preferences'

  computed: {
    isDarkMode: preference('isDarkModeEnabled', { defaultValue: false, reactive: false })
  }
```

keep in mind that there is no need to pass an `options` object if you don't need it

```js
  computed: {
    isDarkMode: preference('isDarkModeEnabled')
  }
```

This will basically map your computed property `isDarkMode` to the value you have stored in localStorage under the key `isDarkModeEnabled`.  Here you are explicitly mapping the localStorage key `isDarkModeEnabled` (that we will be creating for you) with your `isDarkMode` computed property.

#### Multiple preferences at the same time

We have two possible ways to create **multiple** `vue-preferences` properties at a time: the _Array_ way or the _Object_ way.

#### The Array way

Suppose you want to create two properties `translatedTo` and `isZoomed`. In the _Array_ way, you could achieve that by doing:

```js
  import { mapPreferences } from 'vue-preferences'

  computed: {
    ...mapPreferences(["translatedTo", "isZoomed"])
  }
```

*Does it sound natural to you?*

If it does, it's because **it's just like [vuex](https://vuex.vuejs.org/guide/state.html)**! 🎉

For those who don't know what I'm talking about, I will explain:

```js
  ...mapPreferences(["translatedTo", "isZoomed"])
```

is great because you can declare as many preferences as you need with just one single line and internally this is just the same as doing:

```js
  translatedTo: preference('translatedTo'),
  isZoomed: preference('isZoomed')
```

*Does it make more sense now?* - Cool!

Hang on, but... Is there a way to pass my custom options to each preference if I declare them as an array?

\- I'm sorry, you can't. You **can't provide custom options** to each preference, but we have good news! We also added support to the _Object_ way, remember we had mentioned this before. Let's see how to use it.

#### The Object way

By using the _Object_ way you are allowed to create both multiple preferences and also provide custom options to each preference (such as `defaultValue`) at the same time.

Let's see how to do it:

```js
  computed: {
    ...mapPreferences({
      translatedTo: {
        defaultValue: 'spanish'
      },
      isZoomed: {
        defaultValue: false
      }
    })
  }
```

### Programmatic usage

This might look pretty familiar to you if you are used to `window.localStorage` API. But it has some advantages to it, for example, you create the property and you only need to know the name once, after that you can just pass the preference as a variable and use it with `get/set`.

#### Retrieve data

If at some point you need to know what is in your preference property, you just need to call the `get` method and you will have it.

```js
// suppose you defined the following preference for saving the site's locale
const locale = preference('locale', { defaultValue: 'en' });

// obtains the value stored in the storage (by default localStorage) under the key "locale" or returns default: "en"
console.log('Current locale is:', locale.get());

// prints "Current locale is: en"
```

> Keep in mind that if you defined your preference without a default value, and you haven't called the API to set any it, then the result of calling `get` will be `null`.

#### Store data

If you didn't define the preference as a computed property and instead did it as a regular variable, then it might happen that you want to handle it by your own.

If that's the case, you don't have other alternative than using the API to set the new values (in fact you have another alternative: to change the storage values with its API, but why would you do that? 🤭)

How to do it?

```js
// suppose the same property than in the previous example
const locale = preference('locale', { defaultValue: 'en' });

locale.set('es');

// obtains the value stored in the storage (by default localStorage) under the key "locale" or returns default: "en"
console.log('Current locale is:', locale.get());

// prints "Current locale is: es"
```

> This time the result is `es`, not `en`.

## Options

This are the options available for the properties you define, any option you define on a preference has precedence over any global option you have defined or any provided default.

| Option  | Default Value | Description |
| ------------- | ------------- | ------------- |
| `storage`  | `window.localStorage`  | Allows you to set up where the properties will be saved. By default we use `localStorage`, but you can use for example `sessionStorage` or any kind of storage. If you provide an object that has the same `getItem` and `setItem` API that `localStorage` has, then you can use that as a storage. |
| `defaultValue`  | `null`  | Allows you to set up the preference with a custom default value. This allows you to ensure that even the first time the preference is read you will get something. |
| `reactive`  | `true`  | By default preferences are reactive. This means that if you use the property in your template/code you can expect it to be observed and trigger re-renders, just like normal computed properties while at the same time the values get persisted to `localStorage` (or your storage of choice). If you disable this behavior the property will not trigger re-renders/re-computation of dependant code |
| `serializer`  | `JSON.stringify`  | The default serializer is `JSON.stringify`, this allows you to save all kinds of objects. You could for example use a CSV serializer.|
| `deserializer`  | `JSON.parse`  | The default deserializer is `JSON.parse`, and if it cannot deserialize a value it will return the value raw from the storage.|
| `namespace`  | `''`  | The default namespace is empty, which means that the properties will get saved and read from the storage with the name of the preference. For example of the preference name is `firstName`, it will get stored as `firstName`, but if you add the namespace `userData`, it will get saved as `userData:firstName`|

🚀 In the near future, we will be supporting other custom options that will add even more power to the preferences you set. Stay tuned and support!

### Global library options

Options can be defined globally and will affect **all** the preferences in your project unless overridden by individual preferences.

Example of global options usage:

```javascript
import VuePreferences from 'vue-preferences';

Vue.use(VuePreferences, {
  storage: window.sessionStorage,
  namespace: 'my-app'
});
```

### Notes

⚡ Please note that the API for defining multiple preferences at the same time is different from the one for creating a single preference (`preference` vs `...mapPreferences`) ⚡

## Contributing

All contributions or issue reporting are welcomed. If you are submitting a bug issue please include information to help us debug it!

If you plan to contribute, please make sure you test the code. Any new feature or bug fix should have its own test case.

## Credits

- <div>Icon made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
- We got inspiration from [ember-preferences](https://github.com/san650/ember-preferences) by our friend [@san650](https://github.com/san650), thank you 🎉!
