"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.count = count;
function count(words) {
    var _a;
    const counts = new Map();
    const regex = /\b([\w']+)\b/g;
    (_a = words
        .trim()
        .toLowerCase()
        .match(regex)) === null || _a === void 0 ? void 0 : _a.forEach((word) => {
        var _a;
        counts.set(word, ((_a = counts.get(word)) !== null && _a !== void 0 ? _a : 0) + 1);
    });
    return counts;
}
