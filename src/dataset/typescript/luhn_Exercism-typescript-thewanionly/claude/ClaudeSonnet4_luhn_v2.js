"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valid = valid;
function valid(digitString) {
    // Remove whitespaces and check length in one pass
    const cleaned = digitString.replace(/\s/g, '');
    if (cleaned.length <= 1)
        return false;
    let sum = 0;
    let shouldDouble = false;
    // Process digits from right to left in a single pass
    for (let i = cleaned.length - 1; i >= 0; i--) {
        const char = cleaned[i];
        // Check if character is a digit
        if (char < '0' || char > '9')
            return false;
        let digit = char.charCodeAt(0) - 48; // Convert char to number using ASCII
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9)
                digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
}
