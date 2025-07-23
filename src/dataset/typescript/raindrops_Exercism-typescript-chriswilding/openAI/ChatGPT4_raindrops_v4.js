"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rainsdrops {
    convert(n) {
        const divBy3 = n % 3 === 0;
        const divBy5 = n % 5 === 0;
        const divBy7 = n % 7 === 0;
        if (!divBy3 && !divBy5 && !divBy7)
            return n.toString();
        let result = "";
        if (divBy3)
            result += "Pling";
        if (divBy5)
            result += "Plang";
        if (divBy7)
            result += "Plong";
        return result;
    }
}
exports.default = Rainsdrops;
