package protein

import (
	"errors"
)

var ErrStop error = errors.New("stop codon")
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
	if result, ok := codonToProtein[codon]; ok {
		if result == "" {
			return "", ErrStop
		}
		return result, nil
	}
	return "", ErrInvalidBase
}

const CODON_LENGTH = 3

func FromRNA(codons string) (proteins []string, e error) {
	if len(codons) < CODON_LENGTH {
		return proteins, nil
	}
	
	capacity := len(codons) / CODON_LENGTH
	proteins = make([]string, 0, capacity)
	
	for i := 0; i <= len(codons)-CODON_LENGTH; i += CODON_LENGTH {
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