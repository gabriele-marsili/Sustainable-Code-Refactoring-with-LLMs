"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rainsdrops {
    convert(n) {
        const divMap = [[3, "Pling"], [5, "Plang"], [7, "Plong"]];
        for (const [div, word] of divMap)
            if (n % div === 0)
                return ((n % 3 === 0 ? "Pling" : "") +
                    (n % 5 === 0 ? "Plang" : "") +
                    (n % 7 === 0 ? "Plong" : ""));
        return n.toString();
    }
}
exports.default = Rainsdrops;
