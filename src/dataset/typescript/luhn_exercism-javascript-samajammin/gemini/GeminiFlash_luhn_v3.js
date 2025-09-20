"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Luhn {
    static valid(input) {
        let sum = 0;
        let alt = false;
        let n = input.length;
        for (let i = n - 1; i >= 0; i--) {
            const char = input[i];
            if (char === ' ') {
                continue;
            }
            const digit = parseInt(char, 10);
            if (isNaN(digit)) {
                return false;
            }
            if (alt) {
                let doubledDigit = digit * 2;
                if (doubledDigit > 9) {
                    doubledDigit -= 9;
                }
                sum += doubledDigit;
            }
            else {
                sum += digit;
            }
            alt = !alt;
        }
        let count = 0;
        for (let i = 0; i < n; i++) {
            if (input[i] !== ' ') {
                count++;
            }
        }
        return count > 1 && sum % 10 === 0;
    }
}
exports.default = Luhn;
