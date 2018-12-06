/**
 * @description Function that generates a time stamp
 * in a specific format (see example below for example output).
 * Example:
 *   2018-12-25 9 00 pm
 *
 * @returns string
 *
 * @author Bryan Guillen
 */

const moment = require('moment');

function generateTimeStamp() {
  return moment().format('YYYY-MM-DD hh mm ss a');
}

module.exports = generateTimeStamp;
