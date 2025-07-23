"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Raindrops {
    convert(n) {
        let result = '';
        const isPling = n % 3 === 0;
        const isPlang = n % 5 === 0;
        const isPlong = n % 7 === 0;
        if (isPling) {
            result += 'Pling';
        }
        if (isPlang) {
            result += 'Plang';
        }
        if (isPlong) {
            result += 'Plong';
        }
        return result || n.toString();
    }
}
exports.default = Raindrops;
