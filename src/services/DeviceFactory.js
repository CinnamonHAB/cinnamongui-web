import { Lamp, Switch, CinnamonBase } from '../CanvasObject'

// let fabric = window.fabric

var DeviceFactory = {
  buildDevice: function (predicate) {
    var foOptions = {
      top: 100,
      left: 100,
      height: 50,
      width: 50
    }
    var floorplanObject

    switch (predicate.keyword) {
      case 'LAMP':
        floorplanObject = new Lamp(foOptions)
        break

      case 'SWITCH':
        floorplanObject = new Switch(foOptions)
        break

      default:
        floorplanObject = new CinnamonBase(foOptions)
    }

    var deviceDefinition = {
      floorplan_object: floorplanObject,
      name: predicate.keyword.toLowerCase() + '_' + +(new Date()),
      predicate_id: predicate.id,
      predicate: predicate
    }

    return deviceDefinition
  }
}
export {
  DeviceFactory
}
