package dna

import "fmt"

// Histogram is a mapping from nucleotide to its count in given DNA.
type Histogram map[rune]int

// DNA is a list of nucleotides.
type DNA string

// Counts generates a histogram of valid nucleotides in the given DNA.
func (d DNA) Counts() (Histogram, error) {
	h := Histogram{'A': 0, 'C': 0, 'G': 0, 'T': 0}

	for _, value := range d {
		if _, ok := h[value]; !ok {
			return nil, fmt.Errorf("not a valid DNA")
		}
		h[value]++
	}
	return h, nil
}