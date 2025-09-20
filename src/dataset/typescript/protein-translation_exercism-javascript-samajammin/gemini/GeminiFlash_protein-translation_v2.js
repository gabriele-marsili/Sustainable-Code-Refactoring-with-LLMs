"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProteinTranslation {
    static proteins(codonString) {
        const codons = codonString.match(/.{1,3}/g);
        if (!codons) {
            return [];
        }
        const proteins = [];
        for (const codon of codons) {
            const protein = this.codonProteinMap[codon];
            if (protein === 'STOP') {
                return proteins;
            }
            if (protein) {
                proteins.push(protein);
            }
        }
        return proteins;
    }
}
ProteinTranslation.codonProteinMap = {
    AUG: 'Methionine',
    UUU: 'Phenylalanine',
    UUC: 'Phenylalanine',
    UUA: 'Leucine',
    UUG: 'Leucine',
    UCU: 'Serine',
    UCC: 'Serine',
    UCA: 'Serine',
    UCG: 'Serine',
    UAU: 'Tyrosine',
    UAC: 'Tyrosine',
    UGC: 'Cysteine',
    UGU: 'Cysteine',
    UGG: 'Tryptophan',
    UAA: 'STOP',
    UAG: 'STOP',
    UGA: 'STOP'
};
exports.default = ProteinTranslation;
