var fabric = window.fabric

var CinnamonBase = fabric.util.createClass(fabric.Image, {
  initialize: function (element, options) {
    options || (options = {})

    this.callSuper('initialize', element, options)
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

  initialize: function (options) {
    options || (options = {})

    var img = fabric.util.createImage()
    img.src = '/static/bulb.png'

    this.callSuper('initialize', img, options)
  }
})
Lamp.build = function (callback, options) {
  var l = new Lamp(options)
  callback && callback(l)
}

var Switch = fabric.util.createClass(CinnamonBase, {
  type: 'switch',

  initialize: function (options) {
    options || (options = {})

    var img = fabric.util.createImage()
    img.src = '/static/switch.png'

    this.callSuper('initialize', img, options)
  }
})
Switch.build = function (callback, options) {
  var l = new Switch(options)
  callback && callback(l)
}

export {
  CinnamonBase,
  Lamp,
  Switch
}
