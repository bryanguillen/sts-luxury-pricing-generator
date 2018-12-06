/**
 * @description Function that maps a distance, in miles and passed
 * in as a Number, to a price.
 *
 * @author Bryan Guillen
 */

function mapDistanceToPrice(miles) {
  let price = '';

  if (miles < 6) {
    price = 15;
  } else if (miles < 9) {
    price = 17.00;
  } else {
    price = (17 + ((210 * (miles - 9)) / 100));
  }

  return price.toFixed(2);
}

module.exports = mapDistanceToPrice;
