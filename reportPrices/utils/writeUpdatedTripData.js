/**
 * @description Wrapper for writing
 * the updated trips, which are all promises
 * for now at least, to a new file.
 *
 * @author Bryan Guillen
 */

 const Json2CsvParser = require('json2csv').Parser;
 const fs = require('fs');

function writeUpdatedTripData(file, updatedTripsData) {
  return new Promise((resolve, reject) => {
    const STRING = 'string';

    Promise.all(updatedTripsData)
         .then((trips) => {
           const json2csvParser = new Json2CsvParser({ trips, doubleQuote: '' });
           const csv = json2csvParser.parse(trips);

           if (typeof file === STRING && file.match(/csv$/) === null) {
             file += '.csv';
           }

           fs.writeFile(file, csv, (error) => {
             if (error) {
               throw error;
             }
             resolve();
           });
         })
         .catch((error) => {
           reject(error);
         });
  });
}

module.exports = writeUpdatedTripData;
