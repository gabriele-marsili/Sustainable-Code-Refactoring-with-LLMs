"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Transcriptor {
    toRna(dna) {
        let result = '';
        for (let i = 0; i < dna.length; i++) {
            const complement = Transcriptor.COMPLEMENTS.get(dna[i]);
            if (complement === undefined) {
                throw 'Invalid input DNA.';
            }
            result += complement;
        }
        return result;
    }
}
Transcriptor.COMPLEMENTS = new Map([
    ['G', 'C'],
    ['C', 'G'],
    ['T', 'A'],
    ['A', 'U']
]);
exports.default = Transcriptor;
