package dna

import "fmt"

// Histogram is a mapping from nucleotide to its count in given DNA.
type Histogram map[rune]int

type DNA string

// Counts generates a histogram of valid nucleotides in the given DNA.
// Returns an error if d contains an invalid nucleotide.
func (d DNA) Counts() (Histogram, error) {
	h := Histogram{
		'A': 0,
		'C': 0,
		'G': 0,
		'T': 0,
	}
	for _, r := range d {
		if _, ok := h[r]; !ok {
			return nil, fmt.Errorf("DNA strand %s contains invalid nucleotides", d)
		}
		h[r]++
	}
	return h, nil
}