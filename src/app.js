import * as Map from './map';
import * as Locations from './locations';
import './style.css';

// Setup Knockout bindings
Locations.applyBindings();

// Set our GoogleMaps API callback function to initMap()
window.initMap = Map.initMap;
