"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Raindrops {
    convert(n) {
        const sounds = this.getSounds(n);
        return sounds || n.toString();
    }
    getSounds(n) {
        let result = '';
        const mod3 = n % 3;
        const mod5 = n % 5;
        const mod7 = n % 7;
        if (mod3 === 0)
            result += Raindrops.SOUNDS[1];
        if (mod5 === 0)
            result += Raindrops.SOUNDS[2];
        if (mod7 === 0)
            result += Raindrops.SOUNDS[4];
        return result;
    }
}
Raindrops.SOUNDS = ['', 'Pling', 'Plang', '', 'Plong'];
Raindrops.DIVISORS = [3, 5, 7];
exports.default = Raindrops;
