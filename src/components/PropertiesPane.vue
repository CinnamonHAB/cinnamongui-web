<template>
  <div class='col-xs-2 full-height' style='background-color:#e0e0e0'>
    <h3>Object properties</h3>

    <template v-if='selectedDevice'>
      <text-input :value='selectedDevice.name' :id="'device-name'" :label="'Name'" :change-callback='updateName'></text-input>

      <h4>Link...</h4>
      <ul>
        <li v-for='link in links'>
          {{ link.keyword }}
        </li>
      </ul>

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
import { updateDevice, deleteDevice, setOpacityFilter } from '../store/actions'
import TextInput from './TextInput'

export default {
  components: {
    TextInput
  },
  computed: {
    ...mapGetters({
      selectedDevice: 'selectedDevice',
      domain: 'domain'
    }),
    links: function () {
      var vm = this
      if (vm.domain == null || vm.domain.predicates == null) return []

      var links = vm.domain.predicates.filter((pred) => {
        return pred.predicate_type === 'link' &&
          pred.predicate_params &&
          pred.predicate_params[0] &&
          pred.predicate_params[0].param_type === vm.selectedDevice.predicate.keyword
      })

      return links
    }
  },
  mounted: function () {
    var vm = this
    setOpacityFilter(vm.$store, function (device) {
      if (vm.selectedDevice && vm.selectedDevice !== device) {
        return 0.5
      }

      return 1
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
