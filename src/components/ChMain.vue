<template>
  <div class='container-fluid full-height main'>
    <div class='row full-height'>
      <ch-toolbox></ch-toolbox>
      <ch-canvas></ch-canvas>
      <ch-properties-pane></ch-properties-pane>
    </div>
  </div>
</template>

<script>
import ChToolbox from './ChToolbox'
import ChCanvas from './ChCanvas'
import ChPropertiesPane from './ChPropertiesPane'

export default {
  name: 'ch-main',
  components: {
    ChToolbox,
    ChCanvas,
    ChPropertiesPane
  }
}
</script>

<style lang='scss'>
.full-height {
  height: 100%;

  &.main {
    height: calc(100% - 53px);
  }
}
</style>
