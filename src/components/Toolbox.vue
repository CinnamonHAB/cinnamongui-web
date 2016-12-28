<template>
  <div class='col-xs-2 full-height' id="toolbox-col" style="background-color:#a0a0a0">
    <p>Hello, I'm Toolbox</p>
    <ul>
      <li>
        <button v-on:click='addSensor'>Add a sensor</button>
      </li>
      <li>
        <button v-on:click='clearAll'>Remove all objects</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { addObject, clearAll } from '../store/actions'

var counter = 1

export default {
  methods: {
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
  }
}
</script>

<style>
#toolbox-col{
	overflow-y: auto;
}
</style>
