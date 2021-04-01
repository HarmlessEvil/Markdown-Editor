<template>
  <div id="app">
    <Header/>
    <Editor/>
  </div>
</template>

<script>
import Editor from "@/components/Editor";
import Header from "@/components/Header";

export default {
  name: 'App',
  components: {
    Header,
    Editor,
  }
}
</script>

<style lang="sass">
@import "assets/sass/global"

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50

  height: 100vh

  display: flex
  flex-direction: column
  align-items: stretch
</style>
