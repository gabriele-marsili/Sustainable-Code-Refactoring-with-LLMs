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
	"UAA": "", // Stop codon
	"UAG": "", // Stop codon
	"UGA": "", // Stop codon
}

func FromCodon(codon string) (string, error) {
	if protein, ok := codonToProtein[codon]; ok {
		if protein == "" {
			return "", ErrStop
		}
		return protein, nil
	}
	return "", ErrInvalidBase
}

func FromRNA(codons string) ([]string, error) {
	proteins := make([]string, 0, len(codons)/3)
	for i := 0; i <= len(codons)-3; i += 3 {
		protein, err := FromCodon(codons[i : i+3])
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