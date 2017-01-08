import { Lamp, Switch } from '../CanvasObject'

// let fabric = window.fabric

var DeviceFactory = {
  buildDevice: function (predicate, callback) {
    var foOptions = {
      top: 100,
      left: 100,
      height: 50,
      width: 50
    }

    var cb = function (floorplanObject) {
      var deviceDefinition = {
        floorplan_object: floorplanObject,
        name: predicate.keyword.toLowerCase() + '_' + +(new Date()),
        predicate_id: predicate.id,
        predicate: predicate
      }

      callback && callback(deviceDefinition)
    }

    switch (predicate.keyword) {
      case 'LAMP':
        Lamp.build(cb, foOptions)
        break

      case 'SWITCH':
        var fo = window.$.extend({angle: 180}, foOptions)
        Switch.build(cb, fo)
        break

      default:
        console.error('Invalid keyword: ' + predicate.keyword)
    }
  }
}
export {
  DeviceFactory
}
