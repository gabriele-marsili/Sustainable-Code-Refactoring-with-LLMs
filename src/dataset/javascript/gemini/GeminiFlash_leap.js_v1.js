//
// This is only a SKELETON file for the "Leap" exercise. It's been provided as a
// convenience to get you started writing code faster.
//

// Using `const` instead of `var` for the Year constructor is a sustainable software engineering
// best practice. It indicates that the `Year` variable itself will not be reassigned,
// improving code clarity and preventing potential accidental reassignments.
const Year = function(input) {
    this.year = input;
};

Year.prototype.isLeap = function() {
    // The original logic for leap year calculation is already quite efficient,
    // consistently performing two modulo operations in all cases.
    //
    // The rule for a leap year is:
    // 1. A year is a leap year if it is divisible by 4, unless...
    // 2. It is divisible by 100, in which case it is NOT a leap year, unless...
    // 3. It is divisible by 400, in which case it IS a leap year.
    //
    // The current `if` structure correctly implements this:
    // - If `this.year` is divisible by 100:
    //   - It then checks if it's also divisible by 400 (Rule 3).
    // - If `this.year` is NOT divisible by 100:
    //   - It then checks if it's divisible by 4 (Rule 1, implicitly excluding Rule 2).
    //
    // The only micro-optimization needed is to remove the redundant ternary operator
    // `? true : false`. The expression `this.year % 400 === 0` already evaluates
    // directly to a boolean value (`true` or `false`), making the ternary
    // unnecessary and slightly less efficient.
    if (this.year % 100 === 0) {
        return this.year % 400 === 0;
    }
    return this.year % 4 === 0;
};

// Correcting the double semicolon, which is likely a typo.
export default Year;