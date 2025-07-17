"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = translate;
function translate(rna) {
    let protein = [];
    for (let w = 0; w < rna.length; w += 3) {
        let codon = rna.substring(w, w + 3);
        switch (codon) {
            case 'AUG':
                protein.push('Methionine');
                break;
            case 'UUU':
            case 'UUC':
                protein.push('Phenylalanine');
                break;
            case 'UUA':
            case 'UUG':
                protein.push('Leucine');
                break;
            case 'UCU':
            case 'UCC':
            case 'UCA':
            case 'UCG':
                protein.push('Serine');
                break;
            case 'UAU':
            case 'UAC':
                protein.push('Tyrosine');
                break;
            case 'UGU':
            case 'UGC':
                protein.push('Cysteine');
                break;
            case 'UGG':
                protein.push('Tryptophan');
                break;
            case 'UAA':
            case 'UAG':
            case 'UGA': return protein;
            default: return protein;
        }
    }
    return protein;
}
