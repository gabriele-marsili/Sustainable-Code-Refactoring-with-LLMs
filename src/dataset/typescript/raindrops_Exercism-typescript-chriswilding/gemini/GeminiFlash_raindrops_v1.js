"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rainsdrops {
    convert(n) {
        let output = '';
        if (n % 3 === 0) {
            output += 'Pling';
        }
        if (n % 5 === 0) {
            output += 'Plang';
        }
        if (n % 7 === 0) {
            output += 'Plong';
        }
        return output || n.toString();
    }
}
exports.default = Rainsdrops;
