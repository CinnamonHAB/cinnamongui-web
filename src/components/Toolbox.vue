<template>
  <div class='col-xs-2 full-height' id="toolbox-col" style="background-color:#a0a0a0">
    <h3>Toolbox</h3>
    <p>Domain name: {{ domain.name }}</p>
    <ul>
      <p v-for='device in devices'>
        <button v-on:click='addDevice(device)' class='btn btn-primary'>Add a {{ device.keyword }}</button>
      </p>
      <hr>
      <p>
        <button v-on:click='deleteAllDevices' class='btn btn-danger'>Delete all devices</button>
      </p>
      <hr>
      <p>
        <button v-on:click='openhabApply' :disabled='loading' class='btn btn-success'>{{ applyMsg }}</button>
      </p>
    </ul>
  </div>
</template>

<script>
import { fetchFloorplan, addDevice, deleteAllDevices, openhabApply } from '../store/actions'
import { DeviceFactory } from '../services/DeviceFactory'

export default {
  data: function () {
    return {
      domain: {},
      loading: false
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
    },
    applyMsg: function () {
      return this.loading ? 'Applying...' : 'Apply to OpenHAB'
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
    },
    openhabApply: function () {
      var vm = this
      vm.loading = true
      openhabApply(this, this.$store).then((resp) => {
        vm.loading = false
        console.log(resp)
      }, function () {
        vm.loading = false
      })
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
