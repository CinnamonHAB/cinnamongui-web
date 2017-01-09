<template>
  <div class='col-xs-2 full-height' style='background-color:#e0e0e0'>
    <h3>Object properties</h3>

    <template v-if='selectedDevice'>
      <text-input :value='selectedDevice.name' :id="'device-name'" :label="'Name'" :change-callback='updateName'></text-input>

      <h4>Link...</h4>
      <div v-for='link in links'>
        <h5>{{ link.keyword }}</h5>
        <p v-for='linkedDevice in possibleLinksFor(link)'>
          <button class='btn btn-sm' v-bind:class='affectsClass(link, linkedDevice)' v-on:mouseover='mouseOver(linkedDevice)' v-on:mouseout='mouseOut(linkedDevice)' v-on:click="toggleLink(link, linkedDevice)">
            ({{ isLinkDefined(link, linkedDevice) ? 'remove' : 'add' }}) {{ linkedDevice.name }}
          </button>
        </p>
      </div>

      <hr>

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
import { updateDevice, deleteDevice, setOpacityFilter, canvasRedraw, fetchLinkDefinitions, addLinkDefinition, deleteLinkDefinition } from '../store/actions'
import TextInput from './TextInput'

export default {
  components: {
    TextInput
  },
  computed: {
    ...mapGetters({
      selectedDevice: 'selectedDevice',
      domain: 'domain',
      floorplan: 'floorplan',
      linkDefinitions: 'linkDefinitions'
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
  data: function () {
    return {
      highlightedDevice: null
    }
  },
  mounted: function () {
    var vm = this

    fetchLinkDefinitions(vm, vm.$store)

    setOpacityFilter(vm.$store, function (device) {
      if (device === vm.highlightedDevice) {
        return 1
      }

      if (vm.selectedDevice && vm.selectedDevice !== device) {
        return 0.3
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
    },
    mouseOver: function (device) {
      this.highlightedDevice = device
      canvasRedraw(this.$store)
    },
    mouseOut: function (device) {
      this.highlightedDevice = null
      canvasRedraw(this.$store)
    },
    possibleLinksFor: function (link) {
      var vm = this

      if (link && link.predicate_params && link.predicate_params[1]) {
        var param = link.predicate_params[1]
        var pl = vm.floorplan.problem.device_definitions.filter(function (dd) {
          return dd.predicate && dd.predicate.keyword === param.param_type
        })
        return pl
      }
      return []
    },
    toggleLink: function (plink, device) {
      var vm = this
      var ld = vm.getLinkDefinition(plink, device)
      if (ld != null) {
        deleteLinkDefinition(vm, vm.$store, ld)
      }
      else {
        ld = {}
        ld.predicate_id = plink.id
        var params = []
        params.push({
          device_definition_id: vm.selectedDevice.id,
          predicate_param_id: plink.predicate_params[0].id
        })
        params.push({
          device_definition_id: device.id,
          predicate_param_id: plink.predicate_params[1].id
        })
        ld.link_definition_params = params
        addLinkDefinition(vm, vm.$store, ld)
      }
    },
    getLinkDefinition: function (plink, device) {
      var vm = this

      var linkDefinition = vm.linkDefinitions.find((ld) => {
        return ld.predicate_id === plink.id &&
          ld.link_definition_params &&
          ld.link_definition_params[0] &&
          ld.link_definition_params[0].device_definition_id === vm.selectedDevice.id &&
          ld.link_definition_params[1] &&
          ld.link_definition_params[1].device_definition_id === device.id
      })

      return linkDefinition
    },
    isLinkDefined: function (plink, device) {
      return this.getLinkDefinition(plink, device) != null
    },
    affectsClass: function (plink, device) {
      if (this.isLinkDefined(plink, device)) {
        return 'btn-danger'
      }
      else {
        return 'btn-success'
      }
    }
  }
}

</script>
