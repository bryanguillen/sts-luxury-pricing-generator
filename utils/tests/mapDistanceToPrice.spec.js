const mapDistanceToPrice = require('../mapDistanceToPrice');
const assert = require('assert');

describe('mapDistanceToPrice', () => {
  it('should return a string', () => {
    const price = mapDistanceToPrice(1);
    assert.equal(typeof price, 'string');
  });

  it('should return a string containing "$" sign', () => {
    const price = mapDistanceToPrice(1);
    assert.notEqual(price.match(/^\d+\$$/), null);
  });

  it('should return "15$" if arg passed in is less than 6', () => {
    const price = mapDistanceToPrice(5);
    assert.equal(price, '15$');
  });

  it('should return "17$" if arg passed in is equal to or greater than 6 and less than 9', () => {
    const price = mapDistanceToPrice(8);
    assert.equal(price, '17$');
  });

  it('should return 17 plus 2.10/mile if arg passed in is greater than 9', () => {
    const price = mapDistanceToPrice(10);
    assert.equal(price, '19.10$');
  });

  it('should return 17 if arg passed in is equal to 9', () => {
    const price = mapDistanceToPrice(9);
    assert.equal(price, '17$');
  });
});
