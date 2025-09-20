"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Luhn {
    static valid(input) {
        let stripped = '';
        for (let i = 0; i < input.length; i++) {
            if (input[i] !== ' ') {
                stripped += input[i];
            }
        }
        if (stripped.length <= 1) {
            return false;
        }
        let sum = 0;
        let isEven = false;
        for (let i = stripped.length - 1; i >= 0; i--) {
            const char = stripped[i];
            if (char < '0' || char > '9') {
                return false;
            }
            let digit = char.charCodeAt(0) - 48;
            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
            isEven = !isEven;
        }
        return sum % 10 === 0;
    }
}
exports.default = Luhn;
