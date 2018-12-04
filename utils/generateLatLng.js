/**
 * @description Function that generates a LatLng object
 * (technically a string). This string is the coordinates
 * used to map out a location within the google maps API.
 *
 * @author Bryan Guillen
 */

function generateLatLng(trip, location) {
 const LATITUDE = location + '_latitude';
 const LONGITUDE = location + '_longitude';
 const latLng = trip[LATITUDE] + ',' + trip[LONGITUDE];

 return latLng;
}

module.exports = generateLatLng;
