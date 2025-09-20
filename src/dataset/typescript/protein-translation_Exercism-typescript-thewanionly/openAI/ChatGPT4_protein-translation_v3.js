"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = translate;
const CodonToProtein = Object.freeze({
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
});
function translate(rnaSequence) {
    const proteins = [];
    for (let i = 0; i < rnaSequence.length; i += 3) {
        const codon = rnaSequence.slice(i, i + 3);
        const protein = CodonToProtein[codon];
        if (!protein || protein === 'STOP')
            break;
        proteins.push(protein);
    }
    return proteins;
}
