"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = convert;
function convert(num) {
    const map = [
        [3, 'Pling'],
        [5, 'Plang'],
        [7, 'Plong'],
    ];
    let result = '';
    for (let i = 0; i < map.length; i++) {
        if (num % map[i][0] === 0) {
            result += map[i][1];
        }
    }
    return result || String(num);
}
