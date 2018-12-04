/**
 * @description Class that models a trip and acts as a wrapper
 * for a trip object literal which comes from parsing an STS Luxury
 * CSV file.
 *
 * @author Bryan Guillen
 */

class Trip {
  constructor(tripMap) {
    this.data = tripMap;
    this.googleMapsRequestData = {
      origin: getPickupLatLng(tripMap , 'pickup'),
      destination: getDropoffLatLng(tripMap, 'dropoff')
    }
  }

  generatePrice() {
    const getTripMileage = this.getTripMileage;
    const googleRequestData = this.googleMapsRequestData;

    return new Promise((resolve, reject) => {
      getTripMileage(googleRequestData) // passed in since this binding gets lost within promise
        .then((distance) => {
          const price = mapDistanceToPrice(parseInt(distance)); // Should this be float??? Touch base with company members.
          this.data.price = price;
          resolve(this.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getTripMileage(googleRequestData) {
    return new Promise ((resolve, reject) => {
      googleMapsClient.directions(googleRequestData)
        .asPromise()
        .then((response) => {
          const distance = response.json.routes[0].legs[0].distance.text;
          resolve(distance);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = Trip;
