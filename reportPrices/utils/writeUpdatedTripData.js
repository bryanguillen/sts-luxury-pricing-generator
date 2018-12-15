/**
 * @description Wrapper for writing
 * the updated trips, which are all promises
 * for now at least, to a new file.
 *
 * @author Bryan Guillen
 */

const Json2CsvParser = require('json2csv').Parser;
const fs = require('fs');
const generateTimeStamp = require('./generateTimeStamp');

function writeUpdatedTripData(file, updatedTripsData) {
  return new Promise((resolve, reject) => {
    const STRING = 'string';
    let deleteCurrentFile = false;

    Promise.all(updatedTripsData)
         .then((trips) => {
           const json2csvParser = new Json2CsvParser({ trips, doubleQuote: '' });
           const csv = json2csvParser.parse(trips);
           const newFile = 'csvUploads/' + generateTimeStamp() + '.csv';

           fs.writeFile(newFile, csv.replace(/"/g, ''), (error) => {
             if (error) {
               throw error;
             }

             fs.unlink(file, (err) => {
               if (err) {
                 throw new Error(err);
               }

               resolve(newFile);
             });
           });
         })
         .catch((error) => {
           reject(error);
         });
  });
}

module.exports = writeUpdatedTripData;
