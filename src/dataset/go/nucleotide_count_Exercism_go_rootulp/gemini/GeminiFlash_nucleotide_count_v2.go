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

	for i := 0; i < len(d); i++ {
		r := rune(d[i])
		switch r {
		case 'A', 'C', 'G', 'T':
			h[r]++
		default:
			return Histogram{}, fmt.Errorf("DNA strand %s contains invalid nucleotides", d)
		}
	}

	return h, nil
}