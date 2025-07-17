"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DNA_TO_RNA = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U'
};
class Transcriptor {
    toRna(dna) {
        const rna = dna
            .split('')
            .map((nucleotide) => DNA_TO_RNA[nucleotide])
            .join('');
        if (rna.length !== dna.length) {
            throw 'Invalid input DNA.';
        }
        return rna;
    }
}
exports.default = Transcriptor;
