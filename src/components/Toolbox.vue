<template>
  <div class='col-xs-2 full-height' id="toolbox-col" style="background-color:#a0a0a0">
    <p>Hello, I'm Toolbox</p>
    <p>Domain name: {{ domain.name }}</p>
    <ul>
      <li v-for='device in devices'>
        <button v-on:click='addDevice(device)'>Add a {{ device.keyword }}</button>
      </li>
      <li>
        <button v-on:click='clearAll'>Remove all objects</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { addObject, clearAll } from '../store/actions'

let apiBase = 'http://localhost:3000'

var counter = 1

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

      return vm.domain.predicates.filter((pred) => { return pred.predicate_type === 'device' })
    }
  },
  methods: {
    addDevice: function (device) {
      console.log('Adding a ' + device.keyword)
      console.log(device)
    },
    addSensor: function () {
      var vm = this

      addObject(vm.$store, {
        id: counter,
        type: 'rect',
        left: 200,
        top: 200,
        width: 50,
        height: 50,
        fill: 'blue'
      })

      counter++
    },
    clearAll: function () {
      var vm = this
      clearAll(vm.$store)
    }
  },
  mounted: function () {
    var vm = this
    console.log('Loading floorplan')
    vm.$http.get(apiBase + '/floorplans').then((response) => {
      if (response.body.length === 0) {
        return Promise.reject('No floorplans')
      }

      var floorplan = response.body[0]
      console.log('Floorplan: ')
      console.log(floorplan)

      console.log('Loading floorplan (' + floorplan.id + ')')

      return vm.$http.get(apiBase + '/floorplans/' + floorplan.id)
    })
    .then((fpDetails) => {
      console.log('Floorplan details:')
      console.log(fpDetails)
      vm.domain = fpDetails.body.domain
    }, (e) => {
      console.log('Error')
      console.log(e)
    })
  }
}
</script>

<style>
#toolbox-col{
	overflow-y: auto;
}
</style>
