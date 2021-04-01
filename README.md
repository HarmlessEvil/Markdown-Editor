# markdown-editor

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Multiple languages spelling support

> Warning: change set of supported languages "on the fly" is not
> implemented

### How to add another language?

To add a language, you need to provide two files: `.dic` and `.aff`. There is already set of languages
available: https://github.com/wooorm/dictionaries. Note that you need to carefully inspect, whether it's license fits
your project.

You can add new language with just two steps:

1. Run `yarn add dictionary-{locale}`, where `{locale}` is one of locales, available in the repository
2. In `Editor.vue` add the following import (the name does not matter):

```js
import localeDic from 'dictionary-{locale}/index.dic'
import localeAff from 'dictionary-{locale}/index.aff'
```

3. Add new entry to `spellCheck.customDicts` object:

```js
data() {
    return {
        // ...
        spellCheck: {
            customDicts: {
                // other locales ...
                "{locale}": {
                    dic: localeDic,
                    aff: localeAff
                },
                "{oneMoreLocale}": {
                    dic: oneMoreLocaleDic,
                    aff: oneMoreLocaleAff
                }
            }
        }
    }
}
```

## Notes

Plugin [`vue-codemirror`](https://www.npmjs.com/package/vue-codemirror)
did not support spell-checking. I modified its code and used
[`patch-package`](https://www.npmjs.com/package/patch-package) to locally apply the fix. Plugin seems to be unsupported
for over a year 😟. Although `patch-package` in my opinion is a perfectly fine scalable solution even for production.
Especially if you'd have to wait too long for Pull Request approval.
