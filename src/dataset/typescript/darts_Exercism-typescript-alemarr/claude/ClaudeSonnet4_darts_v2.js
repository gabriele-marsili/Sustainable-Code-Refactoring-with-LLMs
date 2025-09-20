"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.score = score;
function score(x, y) {
    const distanceSquared = x * x + y * y;
    if (distanceSquared <= 1)
        return 10;
    if (distanceSquared <= 25)
        return 5;
    if (distanceSquared <= 100)
        return 1;
    return 0;
}
