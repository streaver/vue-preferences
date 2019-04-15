# Vue Preferences

<p align="center">
  <img src="https://user-images.githubusercontent.com/11605133/56131403-aec11f00-5f5d-11e9-8df7-ce60eda7dfa7.png" height="150px">
  <p align="center">The coolest and easiest way to manage your user's preferences on the client side witth local storage.<p>
</p>

## Motivation

Many times happen that you want to handle some persistent state on your application
but you find yourself that doing an actual call to your back-end is like "killing a mosquito with a bazooka". For those scenarios, we decided to create the `vue-preferences` library.

With `vue-preferences` you can keep state of your app totally safely by using [window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) under the hood. This way you ensure your UX keeps consistent while at
the same time avoiding simple but annoying calls to your back-end. You can set some
user preferences such as `theme color`, `users' default`, `hidden elements (after user opted-in)`, and many others you can imagine, with great simplicity.

## Table of content

* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Credits](#credits)

## Installation

If your prefer `yarn`:

```
$ yarn add vue-preferences --save
```

or with `npm`:

```
$ npm install vue-preferences --save
```

## Usage

You can define your `vue-preferences` in many ways. You can create them one by one,
many at once and also with or without default values. Let's see what this means!

### Declaring vue-preferences

#### Single preference at a time

Here you'll see how to create a single preference at a time.

Basically you'd do something like:

```js
  computed: {
    isDarkMode: preference('isDarkModeEnabled', { defaultValue: false })
  }
```

or without `defaultValue`, no need to pass `optional` object in this case

```js
  computed: {
    isDarkMode: preference('isDarkModeEnabled')
  }
```

This will basically map to your computed property `isDarkMode` the value you have stored in localStorage under the key `isDarkModeEnabled`.  Here you are explicitly
mapping the localStorage key `isDarkModeEnabled` (that we will be creating for you)
with your `isDarkMode` property.

#### Multiple preferences at the same time

We have two possible ways to create **multiple** `vue-preferences` properties at a time: `The Array Way` or `The Object Way`.

#### The Array Way

Suppose you want to create two properties `translatedTo` and `isZoomed`. In the
`Array` way you could achieve it by doing:


```js
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

is great because you can declare as many preferences as you need with just one
single line and internally this is no other thing than doing:

```js
  translatedTo: preference('translatedTo'),
  isZoomed: preference('isZoomed')
```

*Does it make more sense now?*
\- Cool!

Hang on, but... ¿Is there a way to pass my custom options to each preference if
I declare them as an array?

\- I'm sorry, you can't. You **can't provide custom options** to each preference,
but we have good news!! We also added support to `The Object Way`, remember we
had mentioned this before. Let's see how to use it.

#### The Object Way

By using `the object way` you are allowed to create both multiple `preferences`
and also provide custom options to each preference (such as: `defaultValue`)
at the same time.

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

### Retrieve & Store new values to your preferences

This might look pretty familiar to you if you are used to `window.localStorage` API.


#### Retrieve data

If at some point you need to know what is in your `vue-preferences` property, you
just need to call the `get` method and will have it.


```js
// suppose you defined the following preference for knowing the site's locale
const locale = preference('locale', { defaultValue: 'en' });

// obtains the value stored in localStorage under the key "locale" or returns default: "en"
console.log('Current locale is:', locale.get());

// prints "Current locale is: en"
```

> Have in mind that if you defined your vue-preference without a default value,
and you haven't call the API to set any value, then the result of calling `get`
will be `undefined`.

#### Store data

If you didn't defined the vue-preference as a computed property and instead as
a regular variable, then it might happen that you want to handle it by your own.

If that's the case, you don't have other alternative than using the API to set
the new values (in fact you have another alternative: to change localStorage values
with its API, but why would you do that? 🤭)

How to do it?

```js
// suppose the same property than in the previous example
const locale = preference('locale', { defaultValue: 'en' });

locale.set('es');

// obtains the value stored in localStorage under the key "locale" or returns default: "en"
console.log('Current locale is:', locale.get());

// prints "Current locale is: es"
```

> This time the result is `es` not `en`.

### Notes

⚡ Please note that the API for defining multiple preferences at the same time is
different to the one for creating a single preference (`preference` vs `...mapPreferences`) ⚡

🚀 In the near future we will be supporting other custom options that will add
even more power to the preferences you set. Stay tuned and support!

## Contributing

All contributions or issue reporting are welcomed. If you are submitting a bug
issue please include information to help us debug it!

If you plan to contribute, please make sure you test the code. Any new feature or
bug fix should have it's own test case.

## Credits

- <div>Icon made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
