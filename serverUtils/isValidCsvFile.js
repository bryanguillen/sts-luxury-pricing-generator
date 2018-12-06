/**
 * @description Function that checks whether or not
 * a csv file sent to csvUploads endpoint is valid or not.
 *
 * @author Bryan Guillen
 */

const fs = require('fs');
const validCsvColumns = require('../config/validCsvColumns');

function isValidCsvFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, { encoding: 'utf8' }, (err, data) => {
      if (err) {
        reject(err);
      }

      let rejectFile;

      for (let column of validCsvColumns) {
        let re = new RegExp(column);
        let isInvalidColumn = data.match(re) === null;
        if (isInvalidColumn) {
          rejectFile = isInvalidColumn;
          break;
        }
      }

      if (rejectFile) {
        reject('Invalid csv');
      } else {
        resolve();
      }
    });
  });
}

module.exports = isValidCsvFile;