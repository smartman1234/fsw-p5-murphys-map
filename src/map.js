// Google Map ---------------------------------------------

import * as Locations from './locations';
import * as Data from './locationsData';
import * as FourSquare from './foursquareService'
import * as Axios from 'axios'

// Google Map
export let map;

// Expose js object of each location referenced by id
export let markers = {};

// Shared Google.Maps infowindow used by all markers
export let infoWindow;

// Track currently selected marker
let currentMarker;

export function mapLoadingError() {
	console.log('ERROR loading Google Map');
	Locations.applyBindings(false);
}

export function initMap() {
	// Create a new map
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 46.23789, lng: -63.1324108},
		zoom: 15,
		gestureHandling: 'auto',
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
				Locations.deselectLocation(Locations.locationsModel[currentMarker.id]);
				deactivateMarker(currentMarker);
			}

			// Activate
			activateMarker(this);
			Locations.selectLocation(Locations.locationsModel[this.id]);
		});
		marker.setMap(map);
	}

	// Setup Knockout bindings only after map is loaded
	Locations.applyBindings(true);
}

export function activateMarker(marker) {
	// Get FourSquare content before doing anything else
	const foursquareId = Locations.locationsModel[marker.id].foursquareId();

	Axios.all([FourSquare.getFoursquareVenueDetails(foursquareId), FourSquare.getFoursquareVenueTips(foursquareId)])
		.then(Axios.spread(function (responseDetails, responseTips) {
			// Both requests are now complete

			// Get details
			const phone = responseDetails.data.response.venue.contact.formattedPhone ? responseDetails.data.response.venue.contact.formattedPhone : '';
			const imgUrlPrefix = responseDetails.data.response.venue.bestPhoto.prefix;
			const imgUrlSize = '300x300';
			const imgUrlSuffix = responseDetails.data.response.venue.bestPhoto.suffix;
			const imgUrl = imgUrlPrefix + imgUrlSize + imgUrlSuffix;
			const numLikes = responseDetails.data.response.venue.likes.count;
			const category = responseDetails.data.response.venue.categories[0].name ? responseDetails.data.response.venue.categories[0].name : '';

			// Get tips
			const numTips = responseTips.data.response.tips.count;
			const tips = responseTips.data.response.tips.items; // [0].text

			// Create content string
			let innerContent = `<p>${category} (${numLikes} likes)</p>` +
				`<p>${phone}</p>` +
				`<img class="infowindow-img" src="${imgUrl}">`;

			if (numTips > 0) {
				innerContent += '<div><h3>Recent Comments:</h3><ul class="tips-list">';
				for (let i=0; i<Math.min(numTips, 5); i++) {
					innerContent += `<li>${tips[i].text}</li>`;
				}
				innerContent += '</ul></div>';
			}

			populateInfoWindow(marker, innerContent);
		}))
		.catch(function(error) {
			const innerContent = '<p class="text-red">Error retrieving venue details from FourSquare.</p>';
			populateInfoWindow(marker, innerContent);
		});
}

function populateInfoWindow(marker, innerContent) {
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

		const fullContent = `<div class="infowindow">` +
			`  <h1>${marker.title}</h1>` +
			`  <div>${innerContent}` +
			`  </div>` +
			`</div>`;

		infoWindow.setContent(fullContent);
		infoWindow.open(map, marker);
	}
}

export function deactivateMarker(marker) {
	currentMarker = null;
	marker.setAnimation(null);
	infoWindow.marker = null;
	infoWindow.close();
}
