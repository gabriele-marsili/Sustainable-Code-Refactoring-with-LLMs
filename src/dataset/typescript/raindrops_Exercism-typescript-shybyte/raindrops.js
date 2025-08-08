"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Raindrops {
    constructor() {
        this.mappings = [
            [3, 'Pling'],
            [5, 'Plang'],
            [7, 'Plong']
        ];
    }
    convert(n) {
        let result = '';
        for (const [divisor, sound] of this.mappings) {
            if (n % divisor === 0) {
                result += sound;
            }
        }
        return result || n.toString();
    }
}
exports.default = Raindrops;
