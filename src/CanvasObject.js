var fabric = window.fabric

var CinnamonBase = fabric.util.createClass(fabric.Rect, {
  initialize: function (options) {
    options || (options = {})

    this.callSuper('initialize', options)
    this.set('id', options.id || '')
  },

  toObject: function () {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      id: this.get('id')
    })
  }
})

var Lamp = fabric.util.createClass(CinnamonBase, {
  type: 'lamp',

  initialize: function (options) {
    options || (options = {})

    options.fill = 'green'

    this.callSuper('initialize', options)
  }
})

var Switch = fabric.util.createClass(CinnamonBase, {
  type: 'switch',

  initialize: function (options) {
    options || (options = {})

    options.fill = 'red'

    this.callSuper('initialize', options)
  }
})

export {
  CinnamonBase,
  Lamp,
  Switch
}
