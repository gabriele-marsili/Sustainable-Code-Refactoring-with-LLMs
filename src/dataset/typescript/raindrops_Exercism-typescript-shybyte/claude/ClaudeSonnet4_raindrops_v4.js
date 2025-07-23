"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Raindrops {
    convert(n) {
        const isDivisibleBy3 = n % 3 === 0;
        const isDivisibleBy5 = n % 5 === 0;
        const isDivisibleBy7 = n % 7 === 0;
        if (!(isDivisibleBy3 || isDivisibleBy5 || isDivisibleBy7)) {
            return n.toString();
        }
        return (isDivisibleBy3 ? 'Pling' : '') +
            (isDivisibleBy5 ? 'Plang' : '') +
            (isDivisibleBy7 ? 'Plong' : '');
    }
}
exports.default = Raindrops;
