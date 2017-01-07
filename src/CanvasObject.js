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
  },
  fromObject: function (object, callback) {
    fabric.util.loadImage('./static/bulb.png', function (img) {
      var oImg = new fabric.CinnamonBase(img)
      oImg._initConfig(object)
      oImg._initFilters(object)
      callback(oImg)
    })
  }
})

/* fabric.Image.fromURL('./static/bulb.png', function (oImg) {
      oImg.set({'left': 0})
      oImg.set({'top': 0})
      canvas.add(oImg)
    })
*/

var Lamp = fabric.util.createClass(CinnamonBase, {
  type: 'lamp',

  initialize: function (element, options) {
    options || (options = {})

    options.element = './static/bulb.png'

    this.callSuper('initialize', element, options)
  }
})

var Switch = fabric.util.createClass(CinnamonBase, {
  type: 'switch',

  initialize: function (element, options) {
    options || (options = {})

    options.element = './static/bulb.png'

    this.callSuper('initialize', element, options)
  }
})

export {
  CinnamonBase,
  Lamp,
  Switch
}
