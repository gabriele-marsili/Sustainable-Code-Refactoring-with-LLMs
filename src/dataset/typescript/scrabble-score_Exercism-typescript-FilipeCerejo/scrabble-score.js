"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.score = score;
const LETTERVALUES = {
    1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
    2: ['D', 'G'],
    3: ['B', 'C', 'M', 'P'],
    4: ['F', 'H', 'V', 'W', 'Y'],
    5: ['K'],
    8: ['J', 'X'],
    10: ['Q', 'Z'],
};
function score(word) {
    let value = 0;
    if (word) {
        Object.keys(LETTERVALUES).forEach((i) => {
            LETTERVALUES[Number(i)].forEach((l) => {
                var _a, _b;
                value +=
                    ((_b = (_a = word.match(new RegExp(`${l}`, 'gi'))) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) *
                        Number(i);
            });
        });
    }
    return value;
}
