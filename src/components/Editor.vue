<template>
  <div class="workspace">
    <loading :active.sync="isLoading" loader="bars">
      <div class="loading-text">
        Parsing dictionaries...
      </div>
    </loading>
    <div class="editor-wrapper">
      <div class="title-wrapper">
        <h2 class="editor-title">Editor</h2>
      </div>
      <codemirror
          id="editor"
          spell-check
          ref="editor"
          :value="code"
          @input="update"
          :options="options"
          @changes="showSuggestion"/>
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

import Loading from 'vue-loading-overlay'
import VueMarkdown from 'vue-markdown'

import {codemirror} from 'vue-codemirror/src/index'
import 'codemirror/addon/mode/overlay'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/mode/markdown/markdown'

import autocomplete from '@/assets/data/autocomplete.json'

import 'vue-loading-overlay/dist/vue-loading.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/hint/show-hint.css'

export default {
  name: "Editor",
  components: {
    codemirror,
    Loading,
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
      spellcheckDictionaries: {
        "ru_RU": {
          dic: 'dictionary-ru/index.dic',
          aff: 'dictionary-ru/index.aff'
        },
        "en_US": {
          dic: 'dictionary-en/index.dic',
          aff: 'dictionary-en/index.aff'
        }
      },
      isLoading: true
    }
  },
  methods: {
    addDict(locale, dic, aff) {
      this.$refs.editor.addDict(locale, dic, aff)
    },
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
  },
  async beforeMount() {
    let res = await Promise.all([import('dictionary-ru/index.dic'), import('dictionary-ru/index.aff')])
    this.addDict("ru_RU", res[0].default, res[1].default)

    res = await Promise.all([import('dictionary-en/index.dic'), import('dictionary-en/index.aff')])
    this.addDict("en_US", res[0].default, res[1].default)

    this.isLoading = false
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
  border-left: $border-primary

.title-wrapper
  border-bottom: $border-primary
  padding-left: $gutter-size

.editor-wrapper, .preview-wrapper
  width: 50%

  display: flex
  flex-direction: column

.loading-text
  font-size: 3em

#editor, #preview
  height: 100%
  min-height: 0

  flex: 1

#preview
  padding-left: $gutter-size
  overflow-y: scroll
</style>