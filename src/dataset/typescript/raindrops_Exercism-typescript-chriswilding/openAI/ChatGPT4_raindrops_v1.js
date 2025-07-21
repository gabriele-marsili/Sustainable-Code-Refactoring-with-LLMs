"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rainsdrops {
    convert(n) {
        let result = "";
        if (n % 3 === 0)
            result += "Pling";
        if (n % 5 === 0)
            result += "Plang";
        if (n % 7 === 0)
            result += "Plong";
        return result || n.toString();
    }
}
exports.default = Rainsdrops;
