"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = convert;
function convert(num) {
    const sounds = [
        [3, 'Pling'],
        [5, 'Plang'],
        [7, 'Plong']
    ];
    let result = '';
    for (const [divisor, sound] of sounds) {
        if (num % divisor === 0) {
            result += sound;
        }
    }
    return result || String(num);
}
