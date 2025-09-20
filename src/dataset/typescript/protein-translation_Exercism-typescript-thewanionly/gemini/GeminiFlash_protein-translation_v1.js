"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = translate;
const codonToProtein = new Map([
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
    ['UGU', 'Cysteine'],
    ['UGC', 'Cysteine'],
    ['UGG', 'Tryptophan'],
    ['UAA', 'STOP'],
    ['UAG', 'STOP'],
    ['UGA', 'STOP'],
]);
function translate(rnaSequence) {
    const proteins = [];
    if (!rnaSequence) {
        return proteins;
    }
    for (let i = 0; i < rnaSequence.length; i += 3) {
        const codon = rnaSequence.substring(i, i + 3);
        const protein = codonToProtein.get(codon);
        if (protein === 'STOP') {
            break;
        }
        if (protein) {
            proteins.push(protein);
        }
        else {
            break; // Or throw an error, depending on desired behavior for invalid codons
        }
    }
    return proteins;
}
