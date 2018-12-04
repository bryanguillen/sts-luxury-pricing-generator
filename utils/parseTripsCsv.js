/**
 * @description Function which converts
 * CSV to JSON.
 *
 * @author Bryan Guillen
 */

const csvToJSON = require('csvtojson');

function parseTripsCsv(csvFile) {
  return new Promise((resolve, reject) => {
    csvToJSON()
      .fromFile(csvFile)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = parseTripsCsv;
