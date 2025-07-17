"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Transcriptor {
    constructor() {
        this.complements = {
            G: 'C',
            C: 'G',
            T: 'A',
            A: 'U'
        };
    }
    toRna(dna) {
        return dna
            .split('')
            .map(char => {
            if (!this.complements[char]) {
                throw 'Invalid input DNA.';
            }
            return this.complements[char];
        })
            .join('');
    }
}
exports.default = Transcriptor;
