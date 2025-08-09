//
// This is only a SKELETON file for the "Leap" exercise. It's been provided as a
// convenience to get you started writing code faster.
//

var Year = function(input) {
    this.year = input;
};

Year.prototype.isLeap = function() {
    // A year is a leap year if it is divisible by 4,
    // except for end-of-century years, which must be divisible by 400.
    //
    // This implementation directly translates the rules and is optimized
    // to perform a consistent number of modulo operations (two) for all inputs,
    // minimizing CPU cycles and improving energy efficiency.
    // The redundant ternary operator `? true : false` has been removed
    // as the boolean result of the comparison is sufficient.
    if (this.year % 100 === 0) {
        return this.year % 400 === 0;
    }
    return this.year % 4 === 0;
};

export default Year;