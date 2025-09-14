package protein

import "errors"

var ErrStop = errors.New("stop codon found")
var ErrInvalidBase = errors.New("base not recognized")

var codonMap = map[string]string{
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

var stopCodons = map[string]bool{
	"UAA": true,
	"UAG": true,
	"UGA": true,
}

func FromCodon(codon string) (string, error) {
	if stopCodons[codon] {
		return "", ErrStop
	}
	if protein, exists := codonMap[codon]; exists {
		return protein, nil
	}
	return "", ErrInvalidBase
}

func FromRNA(rna string) ([]string, error) {
	if len(rna)%3 != 0 {
		return nil, ErrInvalidBase
	}

	result := make([]string, 0, len(rna)/3)

	for i := 0; i < len(rna); i += 3 {
		codon := rna[i : i+3]
		
		if stopCodons[codon] {
			return result, nil
		}
		
		if protein, exists := codonMap[codon]; exists {
			result = append(result, protein)
		} else {
			return nil, ErrInvalidBase
		}
	}
	
	return result, nil
}