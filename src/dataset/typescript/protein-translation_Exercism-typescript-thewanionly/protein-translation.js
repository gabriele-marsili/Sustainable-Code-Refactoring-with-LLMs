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
    const codons = rnaSequence.match(/.{1,3}/g) || [];
    for (let codon of codons) {
        if (CodonToProtein[codon] === 'STOP')
            break;
        proteins.push(CodonToProtein[codon]);
    }
    return proteins;
}
