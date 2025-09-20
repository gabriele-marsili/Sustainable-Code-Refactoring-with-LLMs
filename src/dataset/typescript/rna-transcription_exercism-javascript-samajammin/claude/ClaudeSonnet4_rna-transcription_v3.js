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
        let result = '';
        for (let i = 0; i < dna.length; i++) {
            const complement = this.complements[dna[i]];
            if (!complement) {
                throw 'Invalid input DNA.';
            }
            result += complement;
        }
        return result;
    }
}
exports.default = Transcriptor;
