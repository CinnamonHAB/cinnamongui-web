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
export default {
  methods: {
    addSensor: function () {
      window.alert('magic')
    }
  }
}
</script>

<style>
#toolbox-col{
	overflow-y: auto;
}
</style>
