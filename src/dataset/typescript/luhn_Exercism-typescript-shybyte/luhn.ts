"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Luhn {
    static valid(input) {
        let sum = 0;
        let alt = false;
        let n = input.length;
        while (n--) {
            const char = input.charAt(n);
            if (char === ' ') {
                continue;
            }
            const digit = parseInt(char, 10);
            if (isNaN(digit)) {
                return false;
            }
            if (alt) {
                let doubled = digit * 2;
                doubled = (doubled > 9) ? (doubled - 9) : doubled;
                sum += doubled;
            }
            else {
                sum += digit;
            }
            alt = !alt;
        }
        return input.length > 1 && sum % 10 === 0;
    }
}
exports.default = Luhn;
