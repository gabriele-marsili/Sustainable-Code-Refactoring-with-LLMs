"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AMINO_ACIDS = {
    "AUG": "Methionine",
    "UUU": "Phenylalanine",
    "UUC": "Phenylalanine",
    "UUA": "Leucine",
    "UUG": "Leucine",
    "UCU": "Serine",
    "UCC": "Serine",
    "UCA": "Serine",
    "UCG": "Serine",
    "UAU": "Tyrosine",
    "UAC": "Tyrosine",
    "UGU": "Cysteine",
    "UGC": "Cysteine",
    "UGG": "Tryptophan",
};
const STOP = new Set(["UAA", "UAG", "UGA"]);
class ProteinTranslation {
    static proteins(input) {
        const output = [];
        const inputLength = input.length;
        for (let i = 0; i < inputLength; i += 3) {
            const codon = input.substring(i, i + 3);
            if (STOP.has(codon)) {
                return output;
            }
            const aminoAcid = AMINO_ACIDS[codon];
            if (aminoAcid) {
                output.push(aminoAcid);
            }
        }
        return output;
    }
}
exports.default = ProteinTranslation;
