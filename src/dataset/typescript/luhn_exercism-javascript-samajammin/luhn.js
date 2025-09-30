"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Luhn {
    static valid(input) {
        const stripped = input.replace(/\s/g, '');
        if (stripped.length <= 1 || /\D/.test(stripped)) {
            return false;
        }
        const reduced = stripped
            .split('')
            .reverse()
            .map((char, idx) => {
            let int = Number(char);
            if (idx % 2 !== 0) {
                int *= 2;
                return int > 9 ? int - 9 : int;
            }
            return int;
        })
            .reduce((res, cur) => (res += cur));
        return reduced % 10 === 0;
    }
}
exports.default = Luhn;
