/**
 * @description Function that maps a distance, in miles and passed
 * in as a Number (integer not float), to a price.
 * The algorithm follows the rules laid out in the code, which come from
 * company requirements. Note: the formula within the else case
 * essentially means $2.00/mile after 8 miles, plus the base $17.  
 *
 * @author Bryan Guillen
 */

function mapDistanceToPrice(miles) {
  let price = '';

  if (miles < 6) {
    price = 15.00;
  } else if (miles < 9) {
    price = 17.00;
  } else {
    price = (17 + ((200 * (miles - 8)) / 100));
  }

  return price.toFixed(2);
}

module.exports = mapDistanceToPrice;
