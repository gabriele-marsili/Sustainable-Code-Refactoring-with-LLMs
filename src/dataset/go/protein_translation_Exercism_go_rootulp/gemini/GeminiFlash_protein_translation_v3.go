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
	"UAA": "", // Stop codon
	"UAG": "", // Stop codon
	"UGA": "", // Stop codon
}

func FromCodon(codon string) (protein string, e error) {
	protein, ok := codonToProtein[codon]
	if !ok {
		return "", ErrInvalidBase
	}
	if protein == "" {
		return "", ErrStop
	}
	return protein, nil
}

const CODON_LENGTH = 3

func FromRNA(codons string) (proteins []string, e error) {
	numCodons := len(codons) / CODON_LENGTH
	proteins = make([]string, 0, numCodons)

	for i := 0; i < len(codons); i += CODON_LENGTH {
		if i+CODON_LENGTH > len(codons) {
			break // Handle incomplete codons at the end
		}
		codon := codons[i : i+CODON_LENGTH]
		protein, err := FromCodon(codon)
		if err != nil {
			if errors.Is(err, ErrStop) {
				return proteins, nil
			}
			return proteins, err
		}
		proteins = append(proteins, protein)
	}
	return proteins, nil
}