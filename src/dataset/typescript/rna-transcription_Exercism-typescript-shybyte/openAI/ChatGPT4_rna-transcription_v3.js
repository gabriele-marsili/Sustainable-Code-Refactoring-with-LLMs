"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DNA_TO_RNA = new Map([
    ['G', 'C'],
    ['C', 'G'],
    ['T', 'A'],
    ['A', 'U']
]);
class Transcriptor {
    toRna(dna) {
        let rna = '';
        for (const nucleotide of dna) {
            const transcribed = DNA_TO_RNA.get(nucleotide);
            if (!transcribed) {
                throw 'Invalid input DNA.';
            }
            rna += transcribed;
        }
        return rna;
    }
}
exports.default = Transcriptor;
