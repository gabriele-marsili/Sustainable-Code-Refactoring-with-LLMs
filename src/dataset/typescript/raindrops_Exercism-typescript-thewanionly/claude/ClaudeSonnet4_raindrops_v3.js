"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = convert;
function convert(num) {
    const mod3 = num % 3 === 0;
    const mod5 = num % 5 === 0;
    const mod7 = num % 7 === 0;
    if (!(mod3 || mod5 || mod7))
        return String(num);
    return (mod3 ? 'Pling' : '') + (mod5 ? 'Plang' : '') + (mod7 ? 'Plong' : '');
}
