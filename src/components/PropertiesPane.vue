<template>
  <div class='col-xs-2 full-height' style='background-color:#e0e0e0'>
    <h3>Object properties</h3>

    <template v-if='selectedDevice'>
      <text-input :value='selectedDevice.name' :id="'device-name'" :label="'Name'" :change-callback='updateName'></text-input>

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
import { updateDevice, deleteDevice } from '../store/actions'
import TextInput from './TextInput'

export default {
  components: {
    TextInput
  },
  computed: {
    ...mapGetters({
      selectedDevice: 'selectedDevice'
    })
  },
  methods: {
    updateName: function (newName) {
      var vm = this
      vm.selectedDevice.name = newName
      vm.updateDevice()
    },
    updateDevice: function () {
      var vm = this
      updateDevice(vm, vm.$store, vm.selectedDevice)
    },
    deleteDevice: function (device) {
      var vm = this
      deleteDevice(vm, vm.$store, device)
    }
  }
}

</script>
