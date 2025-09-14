package protein

import (
	"errors"
)

// ErrStop represents a stop codon
var ErrStop error = errors.New("stop codon")

// ErrInvalidBase represents an invalid base that cannot me mapped to an amino acid.
var ErrInvalidBase error = errors.New("invalid base")

var codonToProtein = map[string]string{
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
	"UAA": "",
	"UAG": "",
	"UGA": "",
}

func FromCodon(codon string) (protein string, e error) {
	if protein, ok := codonToProtein[codon]; ok {
		if protein == "" {
			return "", ErrStop
		}
		return protein, nil
	}
	return "", ErrInvalidBase
}

const CODON_LENGTH = 3

func FromRNA(codons string) (proteins []string, e error) {
	if len(codons)%CODON_LENGTH != 0 {
		return nil, ErrInvalidBase
	}
	
	numCodons := len(codons) / CODON_LENGTH
	proteins = make([]string, 0, numCodons)
	
	for i := 0; i < len(codons); i += CODON_LENGTH {
		codon := codons[i : i+CODON_LENGTH]
		protein, err := FromCodon(codon)
		if err == ErrStop {
			return proteins, nil
		}
		if err == ErrInvalidBase {
			return proteins, ErrInvalidBase
		}
		proteins = append(proteins, protein)
	}
	return proteins, nil
}