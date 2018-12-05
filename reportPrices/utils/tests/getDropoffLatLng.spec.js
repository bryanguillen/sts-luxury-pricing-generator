const getDropoffLatLng = require('../getDropoffLatLng');
const assert = require('assert');
const mockTrip = {
  pickup_latitude: '-40.123',
  pickup_longitude: '73.123',
  dropoff_latitude: '-40.456',
  dropoff_longitude: '73.456'
}

describe('getDropoffLatLng', () => {
  it('should return a string', () => {
    const latLng = getDropoffLatLng(mockTrip);
    assert.equal(typeof latLng, 'string');
  });

  it('should return object property\'s "dropoff_latitude" as first element in string', () => {
    const latLng = getDropoffLatLng(mockTrip);
    assert.equal(latLng.split(',')[0], mockTrip.dropoff_latitude);
  });

  it('should return object property\'s "dropoff_longitude" as second element in string', () => {
    const latLng = getDropoffLatLng(mockTrip);
    assert.equal(latLng.split(',')[0], mockTrip.dropoff_latitude);
  });
});
