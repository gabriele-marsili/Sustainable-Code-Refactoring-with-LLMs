"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = translate;
const CodonToProtein = {
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
    UGU: 'Cysteine',
    UGC: 'Cysteine',
    UGG: 'Tryptophan',
    UAA: 'STOP',
    UAG: 'STOP',
    UGA: 'STOP'
};
function translate(rnaSequence) {
    const proteins = [];
    const length = rnaSequence.length;
    for (let i = 0; i < length; i += 3) {
        const codon = rnaSequence.substr(i, 3);
        if (codon.length < 3)
            break;
        const protein = CodonToProtein[codon];
        if (protein === 'STOP')
            break;
        if (protein)
            proteins.push(protein);
    }
    return proteins;
}
