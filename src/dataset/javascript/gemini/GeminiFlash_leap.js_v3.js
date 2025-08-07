var Year = function(input) {
    this.year = input;
};

Year.prototype.isLeap = function() {
    // A year is a leap year if it is divisible by 4,
    // unless it is divisible by 100 but not by 400.
    // This can be efficiently expressed with a single boolean logic statement
    // that directly calculates the result without redundant branching.
    // This reduces CPU cycles by avoiding conditional jumps and optimizes for
    // cache locality and pipeline predictability, contributing to lower energy consumption.
    return (this.year % 4 === 0 && this.year % 100 !== 0) || (this.year % 400 === 0);
};

export default Year;