// Google Map ---------------------------------------------

import * as Locations from './locations';
import * as Data from './locationsData';

// Google Map
export let map;

// Expose js object of each location referenced by id
export let markers = {};

// Shared Google.Maps infowindow used by all markers
export let infoWindow;

// Track currently selected marker
let currentMarker;

export function initMap() {
	// Create a new map
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 46.23789, lng: -63.1324108},
		zoom: 15,
		mapTypeControlOptions: {
			mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain']
		}
	});

	infoWindow = new google.maps.InfoWindow();

	let locations = Data.getLocationsData();

	// Iterate through our list of locations and create markers for each
	for (let i = 0; i < locations.length; i++) {
		let position = locations[i].location;
		let title = locations[i].title;
		let id = locations[i].id;
		let marker = new google.maps.Marker({
			position: position,
			title: title,
			animation: google.maps.Animation.DROP,
			id: id
		});

		markers[locations[i].id] = marker;

		marker.addListener('click', function () {
			// Deactivate current marker and deselect current UI controls associated with it
			if (currentMarker) {
				deactivateMarker(currentMarker);
				Locations.deselectLocation(Locations.locationsModel[currentMarker.id]);
			}

			// Activate
			activateMarker(this);
			Locations.selectLocation(Locations.locationsModel[currentMarker.id]);
		});
		marker.setMap(map);
	}

	// Setup Knockout bindings only after map is loaded
	Locations.applyBindings();
}

export function activateMarker(marker) {
	// Set current marker
	currentMarker = marker;

	marker.setAnimation(google.maps.Animation.BOUNCE);

	// Populate info window
	if (infoWindow.marker !== marker) {
		infoWindow.setContent('');
		infoWindow.marker = marker;
		infoWindow.addListener('closeclick', function () {
			deactivateMarker(marker);
			Locations.deselectLocation(Locations.locationsModel[marker.id]);
		});

		// TODO what to put in the infowindow?
		infoWindow.setContent('<div class="infowindow"><h3>' + marker.title + '</h3><div>Infowindow details go here!</div></div>');

		infoWindow.open(map, marker);
	}
}

export function deactivateMarker(marker) {
	marker.setAnimation(null);
	infoWindow.marker = null;
}
