"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Raindrops {
    convert(n) {
        let result = '';
        const factors = [
            { factor: 3, sound: 'Pling' },
            { factor: 5, sound: 'Plang' },
            { factor: 7, sound: 'Plong' }
        ];
        for (const { factor, sound } of factors) {
            if (n % factor === 0) {
                result += sound;
            }
        }
        return result || n.toString();
    }
}
exports.default = Raindrops;
