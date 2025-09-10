package protein

import "fmt"

var ErrStop = fmt.Errorf("stop codon found")
var ErrInvalidBase = fmt.Errorf("base not recognized")

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
	"UAA": "STOP",
	"UAG": "STOP",
	"UGA": "STOP",
}

func FromCodon(codon string) (string, error) {
	protein, ok := codonMap[codon]
	if !ok {
		return "", ErrInvalidBase
	}
	if protein == "STOP" {
		return "", ErrStop
	}
	return protein, nil
}

func FromRNA(rna string) ([]string, error) {
	if len(rna)%3 != 0 {
		return nil, ErrInvalidBase
	}

	result := make([]string, 0, len(rna)/3) // Pre-allocate slice

	for i := 0; i < len(rna); i += 3 {
		protein, err := FromCodon(rna[i:i+3])
		if err != nil {
			if err == ErrStop {
				return result, nil
			}
			return nil, err
		}
		result = append(result, protein)
	}
	return result, nil
}