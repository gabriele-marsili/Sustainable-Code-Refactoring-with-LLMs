"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.primes = primes;
function primes(limit) {
    // -1 to exclude 0
    let crive = Array.from(Array(limit - 1), () => true);
    let idx = 0;
    while (idx > -1 && idx < Math.ceil(Math.sqrt(limit))) {
        let multiple = 2;
        while (multiple * (idx + 2) <= limit) {
            // -2 -> 0 index refers to number 2
            crive[multiple * (idx + 2) - 2] = false;
            // console.log(crive);
            multiple++;
        }
        idx = crive.indexOf(true, idx + 1);
    }
    return crive.reduce((acc, cur, idx) => {
        if (cur)
            acc.push(idx + 2); // +2 -> 0 index refers to number 2
        return acc;
    }, []);
}
