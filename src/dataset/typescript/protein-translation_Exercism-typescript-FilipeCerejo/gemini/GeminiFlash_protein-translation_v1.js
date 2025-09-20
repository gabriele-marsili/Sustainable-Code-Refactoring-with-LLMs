"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = translate;
function translate(rna) {
    const codonMap = {
        'AUG': 'Methionine',
        'UUU': 'Phenylalanine',
        'UUC': 'Phenylalanine',
        'UUA': 'Leucine',
        'UUG': 'Leucine',
        'UCU': 'Serine',
        'UCC': 'Serine',
        'UCA': 'Serine',
        'UCG': 'Serine',
        'UAU': 'Tyrosine',
        'UAC': 'Tyrosine',
        'UGU': 'Cysteine',
        'UGC': 'Cysteine',
        'UGG': 'Tryptophan',
        'UAA': 'STOP',
        'UAG': 'STOP',
        'UGA': 'STOP',
    };
    const protein = [];
    for (let i = 0; i < rna.length; i += 3) {
        const codon = rna.substring(i, i + 3);
        const aminoAcid = codonMap[codon];
        if (!aminoAcid) {
            return protein;
        }
        if (aminoAcid === 'STOP') {
            return protein;
        }
        protein.push(aminoAcid);
    }
    return protein;
}
