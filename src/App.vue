<template>
  <div id="app">
    <navbar></navbar>
    <editor></editor>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Editor from './components/Editor'

export default {
  name: 'app',
  components: {
    Navbar,
    Editor
  }
}
</script>

<style>
#app {
  height: 100vh;
}
</style>
