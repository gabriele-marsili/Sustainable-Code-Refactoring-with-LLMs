package protein

import (
	"errors"
)

// ErrStop represents a stop codon
var ErrStop = errors.New("stop codon")

// ErrInvalidBase represents an invalid base that cannot be mapped to an amino acid.
var ErrInvalidBase = errors.New("invalid base")

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
	"UAA": "STOP",
	"UAG": "STOP",
	"UGA": "STOP",
}

func FromCodon(codon string) (string, error) {
	if protein, ok := codonToProtein[codon]; ok {
		if protein == "STOP" {
			return "", ErrStop
		}
		return protein, nil
	}
	return "", ErrInvalidBase
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
			return nil, err
		}
		proteins = append(proteins, protein)
	}
	return proteins, nil
}