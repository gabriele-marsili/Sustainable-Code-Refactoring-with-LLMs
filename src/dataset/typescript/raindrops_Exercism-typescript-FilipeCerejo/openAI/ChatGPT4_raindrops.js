"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = convert;
function convert(n) {
    const divisible = [(3, 'Pling'), (5, 'Plang'), (7, 'Plong')];
    let result = '';
    for (const [factor, sound] of divisible) {
        if (n % factor === 0)
            result += sound;
    }
    return result || String(n);
}
