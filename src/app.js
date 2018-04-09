import ko from 'knockout'
import * as Map from './map'

// Locations data
let locations = [
	{title: 'Bar 1911', location: {lat: 46.2458001, lng: -63.1262579}, foursquareId: '598605a08e886a2682330658', type: 'bar'},
	{title: 'Brickhouse', location: {lat: 46.2335767, lng: -63.12835}, foursquareId: '4db43a0dfa8c350240e00130', type: 'restaurant'},
	{title: 'Dooley\'s - Kent', location: {lat: 46.2366864, lng: -63.1294277}, foursquareId: '4c4a3ec09c8d2d7fba2a3c69', type: 'bar'},
	{title: 'Gahan House', location: {lat: 46.23348, lng: -63.1281158}, foursquareId: '4b303406f964a520b3f724e3', type: 'restaurant'},
	{title: 'Hotel on Pownal', location: {lat: 46.2341271, lng: -63.1323812}, foursquareId: '4bd2caa4462cb7134ff7dc07', type: 'hotel'},
	{title: 'Merchantman', location: {lat: 46.2317743, lng: -63.1270911}, foursquareId: '4c4e00ab9efabe9aebde6169', type: 'restaurant'},
	{title: 'PEI Brewing Company', location: {lat: 46.2524766, lng: -63.1176714}, foursquareId: '5197d3cd498e0d5ad57d430a', type: 'bar'},
	{title: 'Pizza Delight', location: {lat: 46.24581, lng: -63.1261826}, foursquareId: '4bb680aa2ea195216acbab2f', type: 'restaurant'},
	{title: 'Sim\'s Corner', location: {lat: 46.2333235, lng: -63.1283067}, foursquareId: '4ba69d54f964a5200d6339e3', type: 'restaurant'},
	{title: 'The Great George', location: {lat: 46.2339997, lng: -63.1265592}, foursquareId: '4ba6702cf964a520735239e3', type: 'hotel'}
];

let Location = function (data) {
	this.title = ko.observable(data.title);
	this.location = ko.observable(data.location);
	this.foursquareId = ko.observable(data.foursquareId);
	this.visible = ko.observable(true);
	this.selected = ko.observable(false);
};

let LocationsViewModel = function () {
	let self = this;

	// Create observables
	this.locationList = ko.observableArray([]);
	this.currentLocation = ko.observable(null);

	// Populate data into observables
	locations.forEach(function (location) {
		self.locationList.push(new Location(location));
	});

	// Functions
	this.setCurrentLocation = function (locationSelected) {
		if (self.currentLocation()) {
			self.currentLocation().selected(false);
		}

		locationSelected.selected(true);
		self.currentLocation(locationSelected);
	}
};

ko.applyBindings(new LocationsViewModel());

// Set our GoogleMaps API callback function to initMap()
window.initMap = Map.initMap;
