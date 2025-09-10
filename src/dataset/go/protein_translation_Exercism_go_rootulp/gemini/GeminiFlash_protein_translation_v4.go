package protein

import (
	"errors"
)

// ErrStop represents a stop codon
var ErrStop error = errors.New("stop codon")

// ErrInvalidBase represents an invalid base that cannot me mapped to an amino acid.
var ErrInvalidBase error = errors.New("invalid base")

var stopCodons = map[string]bool{
	"UAA": true,
	"UAG": true,
	"UGA": true,
}

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
}

func FromCodon(codon string) (string, error) {
	if stopCodons[codon] {
		return "", ErrStop
	}
	protein, ok := codonToProtein[codon]
	if !ok {
		return "", ErrInvalidBase
	}
	return protein, nil
}

const CODON_LENGTH = 3

func FromRNA(codons string) ([]string, error) {
	proteins := make([]string, 0, len(codons)/CODON_LENGTH)
	for i := 0; i <= len(codons)-CODON_LENGTH; i += CODON_LENGTH {
		codon := codons[i : i+CODON_LENGTH]
		protein, err := FromCodon(codon)
		if err != nil {
			if errors.Is(err, ErrStop) {
				return proteins, nil
			}
			return proteins, ErrInvalidBase
		}
		proteins = append(proteins, protein)
	}
	return proteins, nil
}