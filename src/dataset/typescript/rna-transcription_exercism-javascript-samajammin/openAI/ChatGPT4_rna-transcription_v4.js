"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Transcriptor {
    toRna(dna) {
        let rna = '';
        for (let i = 0; i < dna.length; i++) {
            const complement = Transcriptor.complements[dna[i]];
            if (!complement)
                throw 'Invalid input DNA.';
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
