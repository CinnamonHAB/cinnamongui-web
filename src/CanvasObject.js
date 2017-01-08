var fabric = window.fabric

var CinnamonBase = fabric.util.createClass(fabric.Image, {
  initialize: function (element, options) {
    options || (options = {})

    this.callSuper('initialize', element, options)
    console.log(arguments)
    console.log('options:')
    console.log(options)
    this.set('lockUniScaling', true)
    this.set('id', options.id || '')
    this.set('device_definition_id', options.device_definition_id || '')
  },

  toObject: function () {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      id: this.get('id'),
      device_definition_id: this.get('device_definition_id')
    })
  }
})

var Lamp = fabric.util.createClass(CinnamonBase, {
  type: 'lamp',

  initialize: function (element, options) {
    options || (options = {})

    // this.setSrc('/static/bulb.png')
    this.callSuper('initialize', options)
  }
})
Lamp.build = function (callback, options) {
  fabric.util.loadImage('/static/bulb.png', function (img) {
    console.log('image type')
    console.log(img)
    var l = new Lamp(img, options)
    console.log(l)
    callback(l)
  }, null, options && options.crossOrigin)
}

var Switch = fabric.util.createClass(CinnamonBase, {
  type: 'switch',

  initialize: function (element, options) {
    options || (options = {})

    // this.setSrc('/static/bulb.png')
    this.callSuper('initialize', options)
  }
})
Switch.build = function (callback, options) {
  fabric.util.loadImage('/static/bulb.png', function (img) {
    callback(new Switch(img, options))
  }, null, options && options.crossOrigin)
}

export {
  CinnamonBase,
  Lamp,
  Switch
}
