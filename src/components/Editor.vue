<template>
  <codemirror v-model="code" :options="options" id="editor" :spell-check="spellCheck" />
</template>

<script>
import {codemirror} from 'vue-codemirror/src/index'
import 'codemirror/addon/mode/overlay'
import 'codemirror/mode/markdown/markdown'

import ruDic from 'dictionary-ru/index.dic'
import ruAff from 'dictionary-ru/index.aff'
import enDic from 'dictionary-en/index.dic'
import enAff from 'dictionary-en/index.aff'

import 'codemirror/lib/codemirror.css'

export default {
  name: "Editor",
  components: {
    codemirror
  },
  data() {
    return {
      code: '',
      options: {
        mode: 'spell-checker',
        backdrop: 'text/x-markdown',
        styleActiveLine: true,
        lineNumbers: true
      },
      spellCheck: {
        customDicts: {
          "ru_RU": {
            dic: ruDic,
            aff: ruAff
          },
          "en_US": {
            dic: enDic,
            aff: enAff
          }
        }
      }
    }
  }
}
</script>

<style lang="sass">
#editor .CodeMirror
  height: 100%

#editor .CodeMirror .cm-spell-error
  text-decoration: red underline wavy
</style>

<style scoped lang="sass">
#editor
  flex: 1
  min-height: 0
</style>