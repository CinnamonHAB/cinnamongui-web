<template>
  <div class='col-xs-2 full-height' id="toolbox-col" style="background-color:#a0a0a0">
    <h3>Toolbox</h3>
    <p>Domain name: {{ domain.name }}</p>
    <ul>
      <li v-for='device in devices'>
        <button v-on:click='addDevice(device)'>Add a {{ device.keyword }}</button>
      </li>
      <li>
        <button v-on:click='deleteAllDevices'>Delete all devices</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { fetchFloorplan, addDevice, deleteAllDevices } from '../store/actions'
import { DeviceFactory } from '../services/DeviceFactory'

export default {
  data: function () {
    return {
      domain: {}
    }
  },
  computed: {
    devices: function () {
      var vm = this
      if (vm.domain == null || vm.domain.predicates == null) return []

      console.log(vm.domain.predicates)

      return vm.domain.predicates.filter((pred) => {
        return pred.predicate_type === 'device'
      })
    }
  },
  methods: {
    addDevice: function (device) {
      var vm = this
      console.log('Adding a ' + device.keyword)
      console.log(device)

      DeviceFactory.buildDevice(device, function (deviceDefinition) {
        addDevice(vm, vm.$store, deviceDefinition)
      })
    },
    deleteAllDevices: function () {
      var vm = this
      deleteAllDevices(vm, vm.$store)
    }
  },
  mounted: function () {
    var vm = this
    fetchFloorplan(vm, vm.$store)
    .then((fpDetails) => {
      vm.domain = fpDetails.domain
    }, (e) => {
    })
  }
}
</script>

<style>
#toolbox-col{
	overflow-y: auto;
}
</style>
