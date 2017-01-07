<template>
  <div class='col-xs-2 full-height' style='background-color:#e0e0e0'>
    <h3>Object properties</h3>

    <template v-if='selectedDevice'>
      {{ selectedDevice.name }}

      <p>
        <button class="btn btn-danger" v-on:click='deleteDevice(selectedDevice)'>
          Delete
        </button>
      </p>
    </template>
    <p v-else>
      Please select a device
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { deleteDevice } from '../store/actions'

export default {
  computed: {
    ...mapGetters({
      selectedDevice: 'selectedDevice'
    })
  },
  methods: {
    deleteDevice: function (device) {
      var vm = this
      deleteDevice(vm, vm.$store, device)
    }
  }
}

</script>
