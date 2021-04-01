# markdown-editor

## Project setup

```
yarn install
```
### Compiles and minifies for production

```
yarn build
```

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

## Autocomplete

The file with autocomplete phrases is located at `src/assets/data/autocomplete.json`.
It has the following dead-simple structure:
```json
{
  "word": ["replacement", "suggestions"]
}
```

Suggestion widget will pop up near cursor in 150ms after user will 
stop typing or pasting code. To apply suggestion, `TAB` should be
pressed – it will apply currently seleccted suggestion.

## Notes

Plugin [`vue-codemirror`](https://www.npmjs.com/package/vue-codemirror)
did not support spell-checking. I modified its code and used
[`patch-package`](https://www.npmjs.com/package/patch-package) to locally apply the fix. Plugin seems to be unsupported
for over a year 😟. Although `patch-package` in my opinion is a perfectly fine scalable solution even for production.
Especially if you'd have to wait too long for Pull Request approval.

Same story with [`codemirror-spell-checker`](https://www.npmjs.com/package/codemirror-spell-checker).
It didn't support spell check for multiple languages, so I had to
add it manually by patchnig the package. The code is based on 
existing Pull Request anyway 🙂.
