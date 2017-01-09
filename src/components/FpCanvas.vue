<!-- FloorPlan Canvas component -->
<template>
  <div class='col-xs-8 full-height' id='fp-canvas-col' style='background-color:#c0c0c0'>
    <canvas id='main-canvas'></canvas>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { updateDevice, selectDevice, deselectDevice } from '../store/actions'
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

    canvas.on('object:selected', function (e) {
      selectDevice(vm.$store, e.target.device_definition_id)
    })

    canvas.on('selection:cleared', function (e) {
      deselectDevice(vm.$store)
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
      floorplan: 'floorplan',
      lastDevice: 'lastDevice',
      opacityFilter: 'opacityFilter',
      selectedDevice: 'selectedDevice',
      canvasRedraw: 'canvasRedraw'
    })
  },
  watch: {
    'floorplan.problem.device_definitions': function () {
      console.log('Device definitions changed. Redrawing...')
    },
    'lastDevice': function () {
      console.log('Device definitions changed. Redrawing...')
    },
    'selectedDevice': function () {
      console.log('selected device changed')
    },
    'canvasRedraw': function () {
      this.redraw()
    }
  },
  methods: {
    redraw: function () {
      var vm = this

      try {
        var canvasObjects = vm.canvas.getObjects()

        var deviceDefinitionIds = vm.floorplan.problem.device_definitions.map((dd) => {
          return dd.id
        })

        for (var ind = canvasObjects.length - 1; ind >= 0; --ind) {
          var co = canvasObjects[ind]
          if (deviceDefinitionIds.indexOf(co.device_definition_id) === -1) {
            co.remove()
          }
        }

        for (var i in vm.$store.getters.floorplan.problem.device_definitions) {
          var device = vm.$store.getters.floorplan.problem.device_definitions[i]

          var canvasObj = canvasObjects.find(function (co) {
            return co.device_definition_id === device.id
          })

          if (canvasObj == null) {
            var obj = device.floorplan_object

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
            vm.canvas.add(canvasObj)
          }

          if (vm.$store.getters.opacityFilter) {
            canvasObj.opacity = vm.$store.getters.opacityFilter(device)
          }
        }

        vm.canvas.renderAll()
      }
      catch (ex) {
        console.error('Exception')
        console.error(ex)
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
