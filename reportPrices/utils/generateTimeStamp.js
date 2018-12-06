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

const moment = require('moment-timezone');

function generateTimeStamp() {
  return moment().tz('America/New_York').format('YYYY-MM-DD_hhmma');
}

module.exports = generateTimeStamp;
