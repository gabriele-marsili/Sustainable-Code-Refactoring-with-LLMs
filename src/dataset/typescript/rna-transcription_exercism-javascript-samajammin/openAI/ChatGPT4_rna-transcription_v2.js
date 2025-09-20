"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Transcriptor {
    toRna(dna) {
        let rna = '';
        for (const char of dna) {
            const complement = Transcriptor.complements[char];
            if (!complement) {
                throw new Error('Invalid input DNA.');
            }
            rna += complement;
        }
        return rna;
    }
}
Transcriptor.complements = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U'
};
exports.default = Transcriptor;
