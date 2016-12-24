<!-- FloorPlan Canvas component -->
<template>
  <div class='col-xs-8 full-height' id='fp-canvas-col' style='background-color:#c0c0c0'>
    <canvas id='main-canvas'></canvas>
  </div>
</template>
<script>
var fabric = window.fabric
export default {
  created: function () {
    console.log("I'm created")
  },
  mounted: function () {
    var $ = window.$
    var canvas = new fabric.Canvas('main-canvas')
    canvas.setWidth($('#fp-canvas-col').width())
    canvas.setHeight($('#fp-canvas-col').height())
    var rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20
    })
    canvas.add(rect)
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
  },
  data: function () {
    console.log("I'm data")
    return {}
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
