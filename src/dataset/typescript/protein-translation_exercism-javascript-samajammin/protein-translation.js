"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProteinTranslation {
    static proteins(codonString) {
        let codons = codonString.match(/.{1,3}/g) || [];
        let proteins = [];
        for (let codon of codons) {
            if (this.codonProteinMap[codon] === 'STOP') {
                return proteins;
            }
            proteins.push(this.codonProteinMap[codon]);
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
