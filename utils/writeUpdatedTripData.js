/**
 * @description Wrapper for writing
 * the updated trips, which are all promises
 * for now at least, to a new file.
 *
 * @author Bryan Guillen
 */

 const Json2CsvParser = require('json2csv').Parser;
 const fs = require('fs');

function writeUpdatedTripData(updatedTripsData) {
  Promise.all(updatedTripsData)
       .then((trips) => {
         const json2csvParser = new Json2CsvParser({ trips, doubleQuote: '' });
         const csv = json2csvParser.parse(trips);

         fs.writeFile('./updatedCsvFile.csv', csv, (error) => {
           if (error) {
             throw error;
           }
           console.log('Successully written to file'); // Remove this once testing is done
         });
       })
       .catch((error) => {
         console.log(error);
       });
}

module.exports = writeUpdatedTripData;
