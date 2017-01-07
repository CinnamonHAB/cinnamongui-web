<template>
  <div class='col-xs-2 full-height' style='background-color:#e0e0e0'>
    <p>Hello, I'm FpPropertiesPane</p>
    <template v-if='selectedDevice'>
      {{ selectedDevice.name }}
    </template>
    <p v-else>
      Please select a device
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      selectedDevice: 'selectedDevice'
    })
  }
}

</script>
