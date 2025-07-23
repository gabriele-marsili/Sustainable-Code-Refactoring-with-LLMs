"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rainsdrops {
    convert(n) {
        const div3 = n % 3 === 0;
        const div5 = n % 5 === 0;
        const div7 = n % 7 === 0;
        if (div3 || div5 || div7) {
            return (div3 ? "Pling" : "") +
                (div5 ? "Plang" : "") +
                (div7 ? "Plong" : "");
        }
        return n.toString();
    }
}
exports.default = Rainsdrops;
