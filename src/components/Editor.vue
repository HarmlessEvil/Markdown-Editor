<template>
  <codemirror v-model="code" :options="options" id="editor" spell-check />
</template>

<script>
import {codemirror} from 'vue-codemirror/src/index'
import 'codemirror/addon/mode/overlay'
import 'codemirror/mode/markdown/markdown'

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
        lineNumbers: true,
        spellCheck: true
      }
    }
  },
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