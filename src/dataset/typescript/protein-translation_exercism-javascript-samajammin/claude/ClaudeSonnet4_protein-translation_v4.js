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
            if (this.stopCodons.has(codon)) {
                return proteins;
            }
            const protein = this.codonProteinMap.get(codon);
            if (protein) {
                proteins.push(protein);
            }
        }
        return proteins;
    }
}
ProteinTranslation.codonProteinMap = new Map([
    ['AUG', 'Methionine'],
    ['UUU', 'Phenylalanine'],
    ['UUC', 'Phenylalanine'],
    ['UUA', 'Leucine'],
    ['UUG', 'Leucine'],
    ['UCU', 'Serine'],
    ['UCC', 'Serine'],
    ['UCA', 'Serine'],
    ['UCG', 'Serine'],
    ['UAU', 'Tyrosine'],
    ['UAC', 'Tyrosine'],
    ['UGC', 'Cysteine'],
    ['UGU', 'Cysteine'],
    ['UGG', 'Tryptophan'],
    ['UAA', 'STOP'],
    ['UAG', 'STOP'],
    ['UGA', 'STOP']
]);
ProteinTranslation.stopCodons = new Set(['UAA', 'UAG', 'UGA']);
exports.default = ProteinTranslation;
