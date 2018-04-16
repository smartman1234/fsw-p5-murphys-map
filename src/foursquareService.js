// Foursquare Service -------------------------------------

import * as Constants from './constants'
import * as Axios from 'axios'

export function getFoursquareVenueDetails(venueId) {
	return Axios.get(`https://api.foursquare.com/v2/venues/${venueId}`, {
		params: {
			client_id: Constants.fs_client_id,
			client_secret: Constants.fs_client_secret,
			v: '20180416'
		}
	});
}

export function getFoursquareVenueTips(venueId) {
	return Axios.get(`https://api.foursquare.com/v2/venues/${venueId}/tips`, {
		params: {
			client_id: Constants.fs_client_id,
			client_secret: Constants.fs_client_secret,
			v: '20180416',
			sort: 'recent'
		}
	});
}
