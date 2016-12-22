<template>
  <div class='container-fluid full-height editor'>
    <div class='row full-height'>
      <toolbox></toolbox>
      <fp-canvas></fp-canvas>
      <properties-pane></properties-pane>
    </div>
  </div>
</template>

<script>
import Toolbox from './Toolbox'
import FpCanvas from './FpCanvas'
import PropertiesPane from './PropertiesPane'

export default {
  name: 'editor',
  components: {
    Toolbox,
    FpCanvas,
    PropertiesPane
  }
}
</script>

<style lang='scss'>
.full-height {
  height: 100%;

  &.editor {
    height: calc(100% - 53px);
  }
}
</style>
