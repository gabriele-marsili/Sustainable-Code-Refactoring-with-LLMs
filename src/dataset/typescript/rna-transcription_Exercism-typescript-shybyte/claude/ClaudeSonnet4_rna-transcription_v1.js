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
        let rna = '';
        for (let i = 0; i < dna.length; i++) {
            const nucleotide = dna[i];
            const rnaBase = DNA_TO_RNA[nucleotide];
            if (rnaBase === undefined) {
                throw 'Invalid input DNA.';
            }
            rna += rnaBase;
        }
        return rna;
    }
}
exports.default = Transcriptor;
