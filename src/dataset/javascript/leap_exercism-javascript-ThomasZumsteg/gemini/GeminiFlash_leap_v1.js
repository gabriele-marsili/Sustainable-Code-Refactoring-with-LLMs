var Year = function(year) {
  this.year = year;
  // The result of isLeap is deterministic for a given year.
  // We can cache it to avoid recomputing if `isLeap` is called multiple times
  // on the same Year instance. This minimizes CPU cycles for subsequent calls.
  this._isLeapYearCache = undefined; // Initialize as undefined to signify not yet computed
};

Year.prototype.isLeap = function() {
  // Check if the leap year status has already been computed and cached.
  if (this._isLeapYearCache === undefined) {
    // If not cached, compute the result based on the original logic.
    // The rule: A year is a leap year if it is divisible by 4,
    // unless it is divisible by 100 but not by 400.
    this._isLeapYearCache = (this.year % 4 === 0 && (this.year % 100 !== 0 || this.year % 400 === 0));
  }
  // Return the cached result.
  return this._isLeapYearCache;
};

export default Year;