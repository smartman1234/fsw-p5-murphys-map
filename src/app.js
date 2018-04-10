import * as Map from './map'
import * as Locations from './locations'

// Setup Knockout bindings
Locations.applyBindings();

// Set our GoogleMaps API callback function to initMap()
window.initMap = Map.initMap;
