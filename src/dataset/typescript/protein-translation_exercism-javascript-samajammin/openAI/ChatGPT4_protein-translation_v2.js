"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProteinTranslation {
    static proteins(codonString) {
        const proteins = [];
        for (let i = 0; i < codonString.length; i += 3) {
            const codon = codonString.slice(i, i + 3);
            const protein = this.codonProteinMap.get(codon);
            if (!protein || protein === 'STOP')
                break;
            proteins.push(protein);
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
exports.default = ProteinTranslation;
