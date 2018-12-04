/**
 * @description Function that uses partial function
 * (i.e. a wrapper) for getting the pickup coordinates
 * to be used for google maps api. For more context, please view
 * generateLatLng.
 *
 * @author Bryan Guillen
 */

const generateLatLng = require('./generateLatLng');

function getPickupLatLng(trip) {
 return generateLatLng(trip, 'pickup');
}

module.exports = getPickupLatLng;
