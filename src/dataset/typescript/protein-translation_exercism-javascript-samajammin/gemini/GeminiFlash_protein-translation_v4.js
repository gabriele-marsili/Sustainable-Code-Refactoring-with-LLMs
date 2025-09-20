"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProteinTranslation {
    static proteins(codonString) {
        const codons = codonString.match(/.{1,3}/g) || [];
        const proteins = [];
        for (let i = 0; i < codons.length; i++) {
            const codon = codons[i];
            const protein = this.codonProteinMap[codon];
            if (protein === 'STOP') {
                return proteins;
            }
            proteins.push(protein);
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
