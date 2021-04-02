# markdown-editor

## Project setup

```
yarn install
```
### Compiles and minifies for production

```
yarn build
```

## Screenshot

<details>
<summary>Click to open (1.2Mib)</summary>

![Screenshot](/docs/screenshot.png)
</details>

## Multiple languages spelling support

### How to add another language?

To add a language, you need to provide two files: `.dic` and `.aff`. There is already set of languages
available: https://github.com/wooorm/dictionaries. Note that you need to carefully inspect, whether it's license fits
your project.

You can add new language with just three steps:

1. Run `yarn add dictionary-{locale}`, where `{locale}` is one of locales, available in the repository
2. In `Editor.vue` add the following lines of code to method `beforeMount()`:
```js
beforeMount() {
    //...
    
    res = await Promise.all([import('dictionary-{locale}/index.dic'), import('dictionary-{locale}/index.aff')])
    this.addDict("{locale}", res[0].default, res[1].default)
    
    this.isLoading = false
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

## Known problems

- Scroll between views is not synchronized
- If I hold enter (or some other key), it may cause some minor UI freezes
- **(high severity)** Library that parses dictionaries does it 
  veeeery slow. Parsing of Russian dictionary takes around 5s!
  But, unfortunately, I can't figure out, how to solve this.
