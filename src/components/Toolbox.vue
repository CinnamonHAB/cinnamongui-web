<template>
  <div class='col-xs-2 full-height' id="toolbox-col" style="background-color:#a0a0a0">
    <p>Hello, I'm Toolbox</p>
    <ul>
      <li>
        <button v-on:click='addSensor'>Add a sensor</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { addObject } from '../store/actions'

export default {
  methods: {
    addSensor: function () {
      var vm = this

      addObject(vm.$store, {
        type: 'rect',
        left: 200,
        top: 200,
        width: 50,
        height: 50,
        fill: 'blue'
      })
    }
  }
}
</script>

<style>
#toolbox-col{
	overflow-y: auto;
}
</style>
