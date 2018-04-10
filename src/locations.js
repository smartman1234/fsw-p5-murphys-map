import ko from 'knockout'

// Data ---------------------------------------------------

let locationTypes = [
	{id: 1, description: 'Restaurant'},
	{id: 2, description: 'Bar'},
	{id: 3, description: 'Hotel'}
];

let locations = [
	{id: 1, title: 'Bar 1911', location: {lat: 46.2458001, lng: -63.1262579}, foursquareId: '598605a08e886a2682330658', typeId: 2},
	{id: 2, title: 'Brickhouse', location: {lat: 46.2335767, lng: -63.12835}, foursquareId: '4db43a0dfa8c350240e00130', typeId: 1},
	{id: 3, title: 'Dooley\'s - Kent', location: {lat: 46.2366864, lng: -63.1294277}, foursquareId: '4c4a3ec09c8d2d7fba2a3c69', typeId: 2},
	{id: 4, title: 'Gahan House', location: {lat: 46.23348, lng: -63.1281158}, foursquareId: '4b303406f964a520b3f724e3', typeId: 1},
	{id: 5, title: 'Hotel on Pownal', location: {lat: 46.2341271, lng: -63.1323812}, foursquareId: '4bd2caa4462cb7134ff7dc07', typeId: 3},
	{id: 6, title: 'Merchantman', location: {lat: 46.2317743, lng: -63.1270911}, foursquareId: '4c4e00ab9efabe9aebde6169', typeId: 1},
	{id: 7, title: 'PEI Brewing Company', location: {lat: 46.2524766, lng: -63.1176714}, foursquareId: '5197d3cd498e0d5ad57d430a', typeId: 2},
	{id: 8, title: 'Pizza Delight', location: {lat: 46.24581, lng: -63.1261826}, foursquareId: '4bb680aa2ea195216acbab2f', typeId: 1},
	{id: 9, title: 'Sim\'s Corner', location: {lat: 46.2333235, lng: -63.1283067}, foursquareId: '4ba69d54f964a5200d6339e3', typeId: 1},
	{id: 10, title: 'The Great George', location: {lat: 46.2339997, lng: -63.1265592}, foursquareId: '4ba6702cf964a520735239e3', typeId: 3}
];

// Model Objects ------------------------------------------

let LocationType = function (data) {
	this.id = ko.observable(data.id);
	this.description = ko.observable(data.description);
};

let Location = function (data, selectedLocationTypes) {
	this.id = ko.observable(data.id);
	this.title = ko.observable(data.title);
	this.location = ko.observable(data.location);
	this.foursquareId = ko.observable(data.foursquareId);
	this.typeId = ko.observable(data.typeId);

	// this.visible = ko.observable(true);
	this.visible = ko.computed(function () {
		let selectedLocationTypeIds = selectedLocationTypes().map(obj => obj.id);
		return !(selectedLocationTypeIds.indexOf(this.typeId()) === -1);
	}, this);

	this.selected = ko.observable(false);
};

// ViewModel ----------------------------------------------

let LocationsViewModel = function () {
	let self = this;

	// Observables
	this.allLocationTypes = ko.observableArray([]);
	this.selectedLocationTypes = ko.observableArray([]);
	locationTypes.forEach(function (locationType) {
		self.allLocationTypes.push(locationType);
		self.selectedLocationTypes.push(locationType);
	});

	this.locationList = ko.observableArray([]);
	locations.forEach(function (location) {
		self.locationList.push(new Location(location, self.selectedLocationTypes));
	});

	this.currentLocation = ko.observable(null);


	// Functions
	this.setCurrentLocation = function (locationSelected) {
		if (self.currentLocation()) {
			self.currentLocation().selected(false);
		}

		locationSelected.selected(true);
		self.currentLocation(locationSelected);
	};
};

export function applyBindings() {
	ko.applyBindings(new LocationsViewModel());
}
