"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = convert;
function convert(num) {
    let result = '';
    // Use a series of if statements without else if to ensure all conditions are checked
    // This avoids potential overhead of more complex structures for a small number of checks
    if (num % 3 === 0) {
        result += 'Pling';
    }
    if (num % 5 === 0) {
        result += 'Plang';
    }
    if (num % 7 === 0) {
        result += 'Plong';
    }
    // Return the accumulated string or the string representation of the number
    // The logical OR operator (||) is efficient for this purpose
    return result || String(num);
}
