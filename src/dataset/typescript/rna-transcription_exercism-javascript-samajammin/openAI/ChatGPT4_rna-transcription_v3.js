"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Transcriptor {
    toRna(dna) {
        let rna = '';
        for (const char of dna) {
            const complement = Transcriptor.complements.get(char);
            if (!complement) {
                throw 'Invalid input DNA.';
            }
            rna += complement;
        }
        return rna;
    }
}
Transcriptor.complements = new Map([
    ['G', 'C'],
    ['C', 'G'],
    ['T', 'A'],
    ['A', 'U']
]);
exports.default = Transcriptor;
