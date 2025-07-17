"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Words {
    count(input) {
        return input
            .trim()
            .toLowerCase()
            .split(/\s+/)
            .reduce((map, s) => {
            const count = map.get(s) || 0;
            map.set(s, count + 1);
            return map;
        }, new Map());
    }
}
exports.default = Words;
