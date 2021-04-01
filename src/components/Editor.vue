<template>
  <codemirror v-model="code" :options="options" id="editor" :spell-check="spellCheck" @changes="showSuggestion"/>
</template>

<script>
import debounce from 'debounce'

import {codemirror} from 'vue-codemirror/src/index'
import 'codemirror/addon/mode/overlay'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/mode/markdown/markdown'

import ruDic from 'dictionary-ru/index.dic'
import ruAff from 'dictionary-ru/index.aff'
import enDic from 'dictionary-en/index.dic'
import enAff from 'dictionary-en/index.aff'

import autocomplete from '@/assets/data/autocomplete.json'

import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/hint/show-hint.css'

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
  },
  methods: {
    showSuggestion: debounce(function (codemirror) {
      codemirror.showHint({
        completeSingle: false,
        hint(editor) {
          const cursor = editor.getCursor()

          const words = editor.getLine(cursor.line)
              .split(/[!"#$%&()*+,-./:;<=>?@[\\\]^_`{|}~ ]/)
              .filter(it => it !== "")
          const word = words.length === 0 ? null : words[words.length - 1]

          if (word === null) {
            return null
          }

          const suggestions = autocomplete[word]
          if (suggestions === undefined) {
            return null
          }

          return {
            list: suggestions,
            from: { line: cursor.line, ch: cursor.ch - word.length },
            to: cursor
          }
        }
      })
    }, 150)
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