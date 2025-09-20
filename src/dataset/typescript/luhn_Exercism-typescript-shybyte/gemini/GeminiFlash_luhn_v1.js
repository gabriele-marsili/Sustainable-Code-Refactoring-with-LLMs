"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Luhn {
    static valid(input) {
        const trimmedInput = input.trim();
        if (!/^\d[\d ]+$/.test(trimmedInput)) {
            return false;
        }
        let sum = 0;
        let alternate = false;
        let nDigits = 0;
        for (let i = trimmedInput.length - 1; i >= 0; i--) {
            const char = trimmedInput[i];
            if (char === ' ') {
                continue;
            }
            const digit = parseInt(char, 10);
            if (isNaN(digit)) {
                return false; // Should not happen due to regex check, but good to have
            }
            nDigits++;
            let addend = digit;
            if (alternate) {
                addend *= 2;
                if (addend > 9) {
                    addend -= 9;
                }
            }
            sum += addend;
            alternate = !alternate;
        }
        return nDigits > 1 && sum % 10 === 0;
    }
}
exports.default = Luhn;
