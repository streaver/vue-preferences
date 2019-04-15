# Vue Preferences

<p align="center">
  <img src="https://user-images.githubusercontent.com/11605133/56131403-aec11f00-5f5d-11e9-8df7-ce60eda7dfa7.png" height="150px">
  <p align="center">The coolest and easiest way to manage your user's preferences on the client side with local storage.<p>
</p>

## Motivation

Many times happens that you want to handle some persistent state on your application but you find that doing an actual call to your back-end is like "killing a mosquito with a bazooka". For those scenarios, we decided to create the `vue-preferences` library.

With `vue-preferences`, you can keep some state of your app on the client side by using [window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) under the hood. This way you ensure your UX keeps consistent while at the same time avoiding simple but annoying calls to your back-end. You can set some user preferences such as `theme color`, `users' default`, `hidden elements (after user opted-in)`, `table sorting`, and many others you can imagine with great simplicity.

## Table of content

* [Installation](#installation)
* [Usage](#usage)
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

### Declaring vue-preferences

#### Single preference at a time

Here you'll see how to create a single preference at a time.

Basically, you would do something like:

```js
  computed: {
    isDarkMode: preference('isDarkModeEnabled', { defaultValue: false })
  }
```

or without `defaultValue`, no need to pass an `options` object in this case

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

// obtains the value stored in localStorage under the key "locale" or returns default: "en"
console.log('Current locale is:', locale.get());

// prints "Current locale is: en"
```

> Keep in mind that if you defined your preference without a default value, and you haven't called the API to set any it, then the result of calling `get` will be `undefined`.

#### Store data

If you didn't define the preference as a computed property and instead did it as a regular variable, then it might happen that you want to handle it by your own.

If that's the case, you don't have other alternative than using the API to set the new values (in fact you have another alternative: to change localStorage values with its API, but why would you do that? 🤭)

How to do it?

```js
// suppose the same property than in the previous example
const locale = preference('locale', { defaultValue: 'en' });

locale.set('es');

// obtains the value stored in localStorage under the key "locale" or returns default: "en"
console.log('Current locale is:', locale.get());

// prints "Current locale is: es"
```

> This time the result is `es`, not `en`.

### Notes

⚡ Please note that the API for defining multiple preferences at the same time is different from the one for creating a single preference (`preference` vs `...mapPreferences`) ⚡

🚀 In the near future, we will be supporting other custom options that will add even more power to the preferences you set. Stay tuned and support!

## Contributing

All contributions or issue reporting are welcomed. If you are submitting a bug issue please include information to help us debug it!

If you plan to contribute, please make sure you test the code. Any new feature or bug fix should have its own test case.

## Credits

- <div>Icon made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
- We got inspiration from [ember-preferences](https://github.com/san650/ember-preferences) by our friend [@san650](https://github.com/san650), thank you 🎉!
