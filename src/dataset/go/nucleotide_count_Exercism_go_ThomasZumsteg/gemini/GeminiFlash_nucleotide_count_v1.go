package dna

import (
	"fmt"
)

// Histogram counts the occurrence of each nucleotide
type Histogram map[rune]int

// DNA is a string of nucleotides
type DNA string

// DNA creates a new DNA strand.
func (dna DNA) Counts() (Histogram, error) {
	histogram := Histogram{'A': 0, 'C': 0, 'G': 0, 'T': 0}
	for _, nucleotide := range dna {
		switch nucleotide {
		case 'A', 'C', 'G', 'T':
			histogram[nucleotide]++
		default:
			return nil, fmt.Errorf("invalid nucleotide: %q", nucleotide)
		}
	}
	return histogram, nil
}

// Count counts the occurrences of a nucleotide in a DNA strand.
func (dna DNA) Count(nucleotide rune) (int, error) {
	histogram, err := dna.Counts()
	if err != nil {
		return 0, err
	}
	count, ok := histogram[nucleotide]
	if !ok {
		return 0, fmt.Errorf("%q is not a valid nucleotide", nucleotide)
	}
	return count, nil
}