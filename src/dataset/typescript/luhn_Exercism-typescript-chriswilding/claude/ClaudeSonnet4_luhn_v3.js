"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SPACE = 32;
const ZERO = 48;
const NINE = 57;
class Luhn {
    static valid(input) {
        let sum = 0;
        let digitCount = 0;
        let isEven = true;
        for (let i = input.length - 1; i >= 0; i--) {
            const c = input.charCodeAt(i);
            if (c === SPACE)
                continue;
            if (c < ZERO || c > NINE)
                return false;
            digitCount++;
            const digit = c - ZERO;
            if (isEven) {
                sum += digit;
            }
            else {
                const doubled = digit * 2;
                sum += doubled > 9 ? doubled - 9 : doubled;
            }
            isEven = !isEven;
        }
        return digitCount >= 2 && sum % 10 === 0;
    }
}
exports.default = Luhn;
