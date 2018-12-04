const normalizeDollarAmount = require('../normalizeDollarAmount');
const assert = require('assert');

describe('normalizeDollarAmount', () => {
  it('should return a string', () => {
    const normalizedString = normalizeDollarAmount('17$');
    assert.equal(typeof normalizedString, 'string');
  });

  it('should return the arg as is if it contains no decimal', () => {
    const normalizedString = normalizeDollarAmount('17$');
    assert.equal(normalizedString, '17$');
  });

  it('should return the arg as is if it contains a decimal but contains tens and ones placeholder', () => {
    const normalizedString = normalizeDollarAmount('17.25$');
    assert.equal(normalizedString, '17.25$');
  });

  it('should return the arg with a zero appended to ones placeholder in cents if missing', () => {
    const normalizedString = normalizeDollarAmount('17.2$');
    assert.equal(normalizedString, '17.20$');
  });
});
