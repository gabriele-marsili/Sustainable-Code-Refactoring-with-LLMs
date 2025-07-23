"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rainsdrops {
    convert(n) {
        let result = "";
        for (let i = 0; i < 3; i++) {
            if (n % Rainsdrops.DIVISORS[i] === 0) {
                result += Rainsdrops.SOUNDS[i];
            }
        }
        return result || n.toString();
    }
}
Rainsdrops.DIVISORS = [3, 5, 7];
Rainsdrops.SOUNDS = ["Pling", "Plang", "Plong"];
exports.default = Rainsdrops;
