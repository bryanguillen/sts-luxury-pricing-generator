/**
 * @description Main function which is invoked
 * to add prices to an STS luxury CSV file.
 *
 * @author Bryan Guillen
 */

const parseTripsCsv = require('./utils/parseTripsCsv');
const Trip = require('./utils/Trip');
const writeUpdatedTripData = require('./utils/writeUpdatedTripData');

function addPricesToCsv(csvFile) {
  return new Promise((resolve, reject) => {
    parseTripsCsv(csvFile)
      .then((trips) => {
        /*
         * Returned and used for later use of Promise.all
         * since the request to Google API is async.
         */
        const updatedTripsPromise = [];

        for (let i = 0; i < trips.length; i++) {
          let trip = new Trip(trips[i]);
          let promiseAddPriceToTrip = trip.addPriceToTrip();
          updatedTripsPromise.push(promiseAddPriceToTrip);
        }

        return updatedTripsPromise;
      })
      .then((updatedTripsPromise) => {
        writeUpdatedTripData(csvFile, updatedTripsPromise)
        .then((newFile) => {
          resolve(newFile);
        })
        .catch((error) => {
          reject(error);
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = addPricesToCsv;
