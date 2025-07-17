"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proverb = proverb;
function proverb(...words) {
    return words
        .reduce((acc, cur, idx, arr) => {
        if (idx < arr.length - 1) {
            acc.push(`For want of a ${cur} the ${arr[idx + 1]} was lost.`);
        }
        else {
            acc.push(`And all for the want of a ${arr[0]}.`);
        }
        return acc;
    }, [])
        .join('\n');
}
