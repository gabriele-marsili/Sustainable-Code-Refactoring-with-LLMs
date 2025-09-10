package dna

import (
	"errors"
)

// Histogram counts the occurrence of each nucleotide
type Histogram map[byte]int

// Dna is a string of nucleotides
type Dna struct {
	counts Histogram
}

// DNA creates a new DNA strand.
func DNA(s string) Dna {
	counts := Histogram{'G': 0, 'T': 0, 'A': 0, 'C': 0}
	for i := 0; i < len(s); i++ {
		if _, ok := counts[s[i]]; ok {
			counts[s[i]]++
		}
	}
	return Dna{counts: counts}
}

// Count counts the occurrences of a nucleotide in a DNA strand.
func (d Dna) Count(n byte) (int, error) {
	if count, ok := d.counts[n]; ok {
		return count, nil
	}
	return 0, errors.New(string(n) + " is not a valid nucleotide")
}

// Counts returns the occurrence of all valid nucleotides in a DNA strand.
func (d Dna) Counts() Histogram {
	return d.counts
}