"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rainsdrops {
    convert(n) {
        const divisibleBy = [
            [3, "Pling"],
            [5, "Plang"],
            [7, "Plong"]
        ];
        let result = "";
        for (const [factor, sound] of divisibleBy) {
            if (n % factor === 0)
                result += sound;
        }
        return result || `${n}`;
    }
}
exports.default = Rainsdrops;
