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
		switch r {
		case 'A', 'C', 'G', 'T':
			h[r]++
		default:
			return nil, fmt.Errorf("DNA stand %s contains invalid nucleotides", d)
		}
	}
	return h, nil
}

func (d DNA) isValid() bool {
	for _, r := range d {
		if r != 'A' && r != 'C' && r != 'G' && r != 'T' {
			return false
		}
	}
	return true
}