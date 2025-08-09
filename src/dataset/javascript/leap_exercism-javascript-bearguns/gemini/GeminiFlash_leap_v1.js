var Year = function(input) {
  this.year = input;
};

Year.prototype.isLeap = function() {
  // A year is a leap year if it is divisible by 4,
  // except for end-of-century years, which must be divisible by 400.
  // This can be expressed as a single boolean logic:
  // (divisible by 4 AND NOT divisible by 100) OR (divisible by 400)
  const year = this.year;
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

export default Year;