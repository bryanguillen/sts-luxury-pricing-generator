const generateLatLng = require('../generateLatLng');
const assert = require('assert');

describe('generateLatLng', () => {
  it('should return a string', () => {
    const mockTrip = {
      pickup_latitude: '-40.123',
      pickup_longitude: '73.123'
    }
    const latLng = generateLatLng(mockTrip, 'pickup');

    assert.equal(typeof latLng, 'string');
  });

  it('should return a comma delimmited string', () => {
    const mockTrip = {
      pickup_latitude: '-40.123',
      pickup_longitude: '73.123'
    }
    const latLng = generateLatLng(mockTrip, 'pickup');

    assert.equal(latLng.split(',').length, 2);
  });

  it('should return a string with latitude as first part of string', () => {
    const mockTrip = {
      pickup_latitude: '-40.123',
      pickup_longitude: '73.123'
    }
    const latLng = generateLatLng(mockTrip, 'pickup');

    assert.equal(latLng.split(',')[0], mockTrip.pickup_latitude);
  });

  it('should return a string with longitude as second part of string', () => {
    const mockTrip = {
      pickup_latitude: '-40.123',
      pickup_longitude: '73.123'
    }
    const latLng = generateLatLng(mockTrip, 'pickup');

    assert.equal(latLng.split(',')[1], mockTrip.pickup_longitude);
  });
});
