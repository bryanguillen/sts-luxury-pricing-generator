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
    let deleteCurrentFile = false;

    Promise.all(updatedTripsData)
         .then((trips) => {
           const json2csvParser = new Json2CsvParser({ trips, doubleQuote: '' });
           const csv = json2csvParser.parse(trips);

           if (typeof file === STRING && file.match(/csv$/) === null) {
             file += '.csv';
             deleteCurrentFile = true; // HACK!!! Delete file with non-csv extension -- the CSV is later deleted, check index.js
           }

           fs.writeFile(file, csv, (error) => {
             if (error) {
               throw error;
             }

             if (deleteCurrentFile) {
               // HACK FOR DELETING ORIGINAL UPLOADED FILE!!!!
               let uploadedFileWithoutExt = file;
               fs.unlink(uploadedFileWithoutExt.replace(/\.csv$/, ''), (err) => {
                 if (err) {
                   throw new Error(err);
                 }
                 resolve();
               });
             } else {
              resolve();
             }
           });
         })
         .catch((error) => {
           reject(error);
         });
  });
}

module.exports = writeUpdatedTripData;
