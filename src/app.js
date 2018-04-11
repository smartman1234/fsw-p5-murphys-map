import * as Map from './map';
import * as Locations from './locations';

// Import css/html for hot reloading
// TODO - Does this need to be done in js? Should it be constrained to dev only?
import './style.css';
import '../index.html'

// Setup Knockout bindings
Locations.applyBindings();

// Set our GoogleMaps API callback function to initMap()
window.initMap = Map.initMap;
