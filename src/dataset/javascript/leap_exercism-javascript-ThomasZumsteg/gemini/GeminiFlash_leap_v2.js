var Year = function(year) {
  this.year = year;
  this._isLeapCalculated = false;
  this._isLeapResult = false;
}

Year.prototype.isLeap = function() {
  if (this._isLeapCalculated) {
    return this._isLeapResult;
  }

  const isDivisibleBy4 = (this.year & 3) === 0;
  const isNotDivisibleBy100 = (this.year % 100) !== 0;
  const isDivisibleBy400 = (this.year % 400) === 0;

  const result = isDivisibleBy4 && (isNotDivisibleBy100 || isDivisibleBy400);

  this._isLeapResult = result;
  this._isLeapCalculated = true;

  return result;
}

export default Year;