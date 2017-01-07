<!-- FloorPlan Canvas component -->
<template>
  <div class='col-xs-8 full-height' id='fp-canvas-col' style='background-color:#c0c0c0'>
    <canvas id='main-canvas'></canvas>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { updateDevice } from '../store/actions'
import { Lamp, Switch } from '../CanvasObject'

var fabric = window.fabric
export default {
  created: function () {
    console.log("I'm created")
  },
  mounted: function () {
    var $ = window.$
    var vm = this

    var canvas = new fabric.Canvas('main-canvas')
    vm.canvas = canvas
    canvas.setWidth($('#fp-canvas-col').width())
    canvas.setHeight($('#fp-canvas-col').height())
    canvas.on('object:moving', function (e) {
      var currentCanvasHeight = canvas.height
      var currentCanvasWidth = canvas.width
      if ((e.target.left + e.target.getWidth()) > (currentCanvasWidth * 0.9)) {
        canvas.setWidth(currentCanvasWidth + 50)
      }
      if ((e.target.top + e.target.getHeight()) > (currentCanvasHeight * 0.9)) {
        canvas.setHeight(currentCanvasHeight + 50)
      }
    })

    canvas.on('object:modified', function (e) {
      // updateObject(vm.$store, e.target.toObject(['id']))
      var canvasObj = e.target.toObject()
      var deviceDefinition = vm.$store.getters.floorplan.problem.device_definitions.filter(function (dd) {
        return dd.id === canvasObj.device_definition_id
      })[0]

      deviceDefinition.floorplan_object = canvasObj
      updateDevice(vm, vm.$store, deviceDefinition)
    })
  },
  data: function () {
    console.log("I'm data")
    return {
      canvas: {}
    }
  },
  computed: {
    ...mapGetters({
      lastObject: 'lastObject',
      lastUpdatedObject: 'lastUpdatedObject',
      objects: 'objects',
      floorplan: 'floorplan',
      lastDevice: 'lastDevice'
    })
  },
  watch: {
    'lastObject': function (lastObject) {
      var vm = this
      // var obj = (new fabric.Rect(lastObject)).toObject(['id'])
      // updateObject(vm.$store, obj)
      vm.redraw()
    },
    lastUpdatedObject: function (obj) {
      // console.log('updated')
      // console.log(obj)
      // console.log(obj.toString())
    },
    'floorplan.problem.device_definitions': function () {
      var vm = this
      console.log('Device definitions changed. Redrawing...')
      vm.redraw()
    },
    'lastDevice': function () {
      var vm = this
      console.log('Device definitions changed. Redrawing...')
      vm.redraw()
    }
  },
  methods: {
    redraw: function () {
      var vm = this
      vm.canvas.clear()

      for (var i in vm.$store.getters.floorplan.problem.device_definitions) {
        var device = vm.$store.getters.floorplan.problem.device_definitions[i]
        console.log(device)
        var obj = device.floorplan_object
        var canvasObj
        if (device.predicate.keyword === 'LAMP') {
          console.log('adding new lamp')
          canvasObj = new Lamp(obj)
        }
        else if (device.predicate.keyword === 'SWITCH') {
          console.log('adding new switch')
          canvasObj = new Switch(obj)
        }
        else {
          console.error('Unknown device type: ' + obj.type)
          continue
        }

        console.log(canvasObj)
        vm.canvas.add(canvasObj)
      }
    }
  }
}
</script>

<style>
#fp-canvas-col{
  padding: 0;
  overflow: scroll;
}
#main-canvas{
  height: 100%;
  width: 100%;
}
</style>
