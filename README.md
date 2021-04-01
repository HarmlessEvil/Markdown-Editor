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

## Notes

Plugin [`vue-codemirror`](https://www.npmjs.com/package/vue-codemirror)
did not support spell-checking. I modified its code and used
[`patch-package`](https://www.npmjs.com/package/patch-package) to 
locally apply the fix. Plugin seems to be unsupported for over a 
year 😟. Although `patch-package` in my opinion is a perfectly fine
scalable solution even for production. Especially if you'd have to
wait too long for Pull Request approval.
