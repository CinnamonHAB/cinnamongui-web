<template>
  <div id="app">
    <ch-navbar></ch-navbar>
    <ch-main></ch-main>
  </div>
</template>

<script>
import ChNavbar from './components/ChNavbar'
import ChMain from './components/ChMain'

export default {
  name: 'app',
  components: {
    ChNavbar,
    ChMain
  }
}
</script>

<style>
#app {
  height: 100vh;
}
</style>
