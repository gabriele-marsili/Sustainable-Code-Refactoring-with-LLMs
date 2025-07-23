"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = convert;
function convert(num) {
    const div3 = num % 3 === 0;
    const div5 = num % 5 === 0;
    const div7 = num % 7 === 0;
    if (!(div3 || div5 || div7))
        return String(num);
    return (div3 ? 'Pling' : '') + (div5 ? 'Plang' : '') + (div7 ? 'Plong' : '');
}
