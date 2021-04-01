<template>
  <div class="workspace">
    <div class="editor-wrapper">
      <div class="title-wrapper">
        <h2 class="editor-title">Editor</h2>
      </div>
      <codemirror
          id="editor"
          :options="options"
          :spell-check="spellCheck"
          :value="code"
          @changes="showSuggestion"
          @input="update"/>
    </div>
    <div class="preview-wrapper">
      <div class="title-wrapper">
        <h2 class="preview-title">Preview</h2>
      </div>
      <VueMarkdown :source="code" id="preview"/>
    </div>
  </div>
</template>

<script>
import debounce from 'debounce'

import VueMarkdown from 'vue-markdown'

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
    codemirror,
    VueMarkdown
  },
  data() {
    return {
      code: '',
      options: {
        mode: 'spell-checker',
        backdrop: 'text/x-markdown',
        styleActiveLine: true,
        lineNumbers: true,
        lineWrapping: true
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
    update: debounce(function (code) {
      this.code = code
    }, 300),
    showSuggestion(codemirror) {
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
            from: {line: cursor.line, ch: cursor.ch - word.length},
            to: cursor
          }
        }
      })
    },
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
.workspace
  flex: 1
  min-height: 0

  display: flex
  align-items: stretch

.preview-wrapper
  border-left: 1px solid gray

.title-wrapper
  border-bottom: 1px solid gray
  padding-left: 29px

.editor-wrapper, .preview-wrapper
  width: 50%

  display: flex
  flex-direction: column

#editor, #preview
  height: 100%
  min-height: 0

  flex: 1

#preview
  padding-left: 29px
  overflow-y: scroll
</style>