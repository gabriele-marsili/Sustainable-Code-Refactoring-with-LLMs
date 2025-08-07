var Year = function(input) {
  this.year = input;
};

Year.prototype.isLeap = function() {
  if (this.year % 100 === 0) {
    // If the year is divisible by 100, it must also be divisible by 400 to be a leap year.
    // The expression 'this.year % 400 === 0' directly evaluates to a boolean,
    // so a ternary '?' true : false' is redundant.
    return this.year % 400 === 0;
  } else {
    // If the year is not divisible by 100, it must be divisible by 4 to be a leap year.
    return this.year % 4 === 0;
  }
};

export default Year;