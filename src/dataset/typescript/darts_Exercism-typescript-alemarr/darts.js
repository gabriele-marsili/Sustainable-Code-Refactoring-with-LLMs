"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.score = score;
function score(x, y) {
    const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    if (distance <= 1)
        return 10;
    if (distance <= 5)
        return 5;
    if (distance <= 10)
        return 1;
    return 0;
}
