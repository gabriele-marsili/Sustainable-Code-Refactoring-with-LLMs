"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SPACE = 32;
const ZERO = 48;
const NINE = 57;
class Luhn {
    static valid(input) {
        let sum = 0;
        let len = 0;
        let odd = false;
        for (let i = input.length - 1; i >= 0; i--) {
            const charCode = input.charCodeAt(i);
            if (charCode === SPACE) {
                continue;
            }
            if (charCode < ZERO || charCode > NINE) {
                return false;
            }
            const digit = charCode - ZERO;
            len++;
            if (odd) {
                let doubled = digit * 2;
                if (doubled > 9) {
                    doubled -= 9;
                }
                sum += doubled;
            }
            else {
                sum += digit;
            }
            odd = !odd;
        }
        return len > 1 && sum % 10 === 0;
    }
}
exports.default = Luhn;
