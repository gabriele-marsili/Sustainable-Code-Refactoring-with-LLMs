"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProteinTranslation {
    static proteins(codonString) {
        const proteins = [];
        const length = codonString.length;
        for (let i = 0; i < length; i += 3) {
            const codon = codonString.substr(i, 3);
            if (codon.length < 3)
                break;
            const protein = this.codonProteinMap[codon];
            if (protein === 'STOP') {
                break;
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
