"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.count = count;
const wordrgx = /\b[a-z0-9']+\b/gi;
function count(sentence) {
    let replacedStr = sentence.replace(/[\s]+/g, ' ');
    let spaceSplited = replacedStr.split(' ');
    let map = new Map();
    spaceSplited.forEach((w) => {
        if (w) {
            let m = w.toLowerCase();
            let entry = map.get(m);
            if (entry) {
                map.set(m, entry + 1);
            }
            else {
                map.set(m, 1);
            }
        }
    });
    return map;
}
