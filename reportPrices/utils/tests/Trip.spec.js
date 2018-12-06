const Trip = require('../Trip');
const assert = require('assert');
const mockTrip = {
  pickup_latitude: '40.84311186',
  pickup_longitude: '-73.9097173',
  dropoff_latitude: '40.83252455',
  dropoff_longitude: '-73.92092891'
};
const trip = new Trip(mockTrip);

describe('Trip', () => {
  describe('Trip.data', () => {
    it('should be the argument passed in via constructor', () => {
      assert.equal(trip.data.pickup_latitude, mockTrip.pickup_latitude);
    });
  });

  describe('Trip.googleMapsRequestData', () => {
    it('should have origin property assigned to pickup "lat + long"', () => {
      assert.equal(trip.googleMapsRequestData.origin, mockTrip.pickup_latitude + ',' + mockTrip.pickup_longitude);
    });

    it('should have origin property assigned to dropoff "lat + long"', () => {
      assert.equal(trip.googleMapsRequestData.destination, mockTrip.dropoff_latitude + ',' + mockTrip.dropoff_longitude);
    });
  });

  describe('Trip.getTripMileage()', () => {
    let mileage;

    before((done) => {
      const googleRequestData = trip.googleMapsRequestData;

      trip.getTripMileage(googleRequestData)
          .then((distance) => {
            mileage = distance;
            done();
          })
          .catch((error) => {
            console.log(error);
            done();
          });
    });

    it('should return a number', () => {
      assert.equal(typeof mileage, 'number');
    });

    it('should return an integer', () => {
      assert.equal(mileage % 1, 0);
    });
  });

  describe('Trip.addPriceToTrip()', () => {
    let updatedTrip;

    before((done) => {
      trip.addPriceToTrip()
          .then((trip) => {
            updatedTrip = trip;
            done();
          })
          .catch((error) => {
            console.log(error);
            done();
          });
    });

    it('should return a string', () => {
      assert.equal(typeof updatedTrip.price, 'string');
    });

    it('should return an object with correct price property added', () => {
      assert.equal(updatedTrip.price, '15.00');
    });
  });
});
