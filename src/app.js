// App Entry Point ----------------------------------------

import * as Map from './map';
import * as $ from 'jquery';

// Import css/html for hot reloading
// TODO - Does this need to be done in js? Should it be constrained to dev only?
import './style.css';
import '../index.html';

// Set our GoogleMaps API callback functions
window.initMap = Map.initMap;
window.mapLoadingError = Map.mapLoadingError;

$(document).ready(function () {
	// Implement hamburger menu toggle on small screens
	$('.hamburger-open').click(function () {
		$('.filter-by').slideToggle('slow');
		$('.place-list').slideToggle('slow', function () {
			$('.hamburger-open').hide();
			$('.hamburger-close').show();
		});
	});

	$('.hamburger-close').click(function () {
		$('.filter-by').slideToggle('slow');
		$('.place-list').slideToggle('slow', function () {
			$('.hamburger-close').hide();
			$('.hamburger-open').show();
		});
	});
});
