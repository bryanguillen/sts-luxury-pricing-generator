/**
 * @description Function that normalizes a dollar
 * amount string. Normaize, in this case, simply means
 * adding a zero to a dollar amount that requires it.
 *
 * E.g. 19.1$ -> 19.10$
 *
 * @author Bryan Guillen
 */

function normalizeDollarAmount(dollarAmount) {
  let wasNormalized = false;
  let normalizeDollarAmount;
  let cents;

  if (dollarAmount.match(/^\d+\.\d\$$/)) {
    normalizeDollarAmount = dollarAmount.split('.');
    cents = normalizeDollarAmount[1];
    normalizeDollarAmount[1] = cents[0] + '0' + cents[1];
    wasNormalized = true;
  }

  if (wasNormalized) {
    return normalizeDollarAmount.join('.')
  } else {
    return dollarAmount;
  }
}

module.exports = normalizeDollarAmount;
