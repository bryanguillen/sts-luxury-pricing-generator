/**
 * @description Function that uses partial function
 * (i.e. a wrapper) for getting the drop off coordinates
 * to be used for google maps api. For more context, please view
 * generateLatLng.
 *
 * @author Bryan Guillen
 */

const generateLatLng = require('./generateLatLng');

function getDropoffLatLng(trip) {
  return generateLatLng(trip, 'dropoff');
}

module.exports = getDropoffLatLng;
