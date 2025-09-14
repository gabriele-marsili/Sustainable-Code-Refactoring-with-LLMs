package dna

import "fmt"

// Histogram is a mapping from nucleotide to its count in given DNA.
type Histogram map[rune]int

// DNA is a list of nucleotides. Choose a suitable data type.
type DNA string

// Counts generates a histogram of valid nucleotides in the given DNA.
// Returns an error if d contains an invalid nucleotide.
func (d DNA) Counts() (Histogram, error) {
	h := make(Histogram, 4)
	h['A'] = 0
	h['C'] = 0
	h['G'] = 0
	h['T'] = 0

	for _, nucleotide := range d {
		switch nucleotide {
		case 'A', 'C', 'G', 'T':
			h[nucleotide]++
		default:
			return h, fmt.Errorf("not a valid DNA")
		}
	}
	return h, nil
}