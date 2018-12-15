const mapDistanceToPrice = require('../mapDistanceToPrice');
const assert = require('assert');

describe('mapDistanceToPrice', () => {
  it('should return a string', () => {
    const price = mapDistanceToPrice(1);
    assert.equal(typeof price, 'string');
  });

  it('should return "15.00" if arg passed in is less than 6', () => {
    const price = mapDistanceToPrice(5);
    assert.equal(price, '15.00');
  });

  it('should return "17.00" if arg passed in is equal to or greater than 6 and less than 9', () => {
    const price = mapDistanceToPrice(8);
    assert.equal(price, '17.00');
  });

  it('should return 17 plus 2.00/mile if arg passed in is greater than or equal to 9', () => {
    const price = mapDistanceToPrice(10);
    assert.equal(price, '21.00');
  });

  it('should return 17 plus 2.00/mile * 2 if arg passed in is 11', () => {
    const price = mapDistanceToPrice(11);
    assert.equal(price, '23.00');
  });

  it('should return 19 if arg passed in is equal to 9', () => {
    const price = mapDistanceToPrice(9);
    assert.equal(price, '19.00');
  });
});
