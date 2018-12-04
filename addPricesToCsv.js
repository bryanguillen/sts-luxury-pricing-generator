/**
 * @description Main function which is invoked
 * to add prices to an STS luxury CSV file.
 */

const parseTripsCsv = require('./utils/parseTripsCsv');
const Trip = require('./utils/Trip');
const writeUpdatedTripData = require('./utils/writeUpdatedTripData');

function addPricesToCsv(csvFile) {
  parseTripsCsv(csvFile)
    .then((trips) => {
      /*
       * Returned and used for later use of Promise.all
       * since the request to Google API is async.
       */
      const updatedTripsPromise = [];

      for (let i = 0; i < trips.length; i++) {
        let trip = new Trip(trips[i]);
        let promiseAddPriceToTrip = trip.generatePrice();
        updatedTripsPromise.push(promiseAddPriceToTrip);
      }

      return updatedTripsPromise;
    })
    .then((updatedTripsPromise) => {
      writeUpdatedTripData(updatedTripsPromise);
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = addPricesToCsv;
