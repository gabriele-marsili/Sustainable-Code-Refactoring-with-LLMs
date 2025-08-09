//
// This is only a SKELETON file for the "Leap" exercise. It's been provided as a
// convenience to get you started writing code faster.
//

var Year = function(input) {
    this.year = input;
};

Year.prototype.isLeap = function() {
    // A year is a leap year if it is divisible by 4,
    // unless it is divisible by 100 but not by 400.
    // This implementation checks the divisibility by 100 first.
    if (this.year % 100 === 0) {
        // If divisible by 100, it must also be divisible by 400 to be a leap year.
        // The original `? true : false` is redundant as the comparison itself returns a boolean.
        return this.year % 400 === 0;
    }
    // If not divisible by 100, it is a leap year if divisible by 4.
    return this.year % 4 === 0;
};

export default Year;;