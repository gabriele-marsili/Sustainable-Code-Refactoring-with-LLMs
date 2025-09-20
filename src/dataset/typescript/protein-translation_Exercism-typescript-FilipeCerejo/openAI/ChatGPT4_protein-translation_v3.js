"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = translate;
const CODON_TO_PROTEIN = {
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
    UAA: null,
    UAG: null,
    UGA: null,
};
function translate(rna) {
    const protein = [];
    for (let w = 0; w < rna.length; w += 3) {
        const codon = rna.slice(w, w + 3);
        const aminoAcid = CODON_TO_PROTEIN[codon];
        if (aminoAcid === null)
            break;
        if (aminoAcid)
            protein.push(aminoAcid);
    }
    return protein;
}
