package dna

import (
	"fmt"
)

//Histogram counts the occurance of each nucleotide
type Histogram map[byte]int

//Dna is a string of nucleotides
type Dna map[byte]int

var validNucleotides = map[byte]bool{'G': true, 'T': true, 'A': true, 'C': true}

/*DNA creats a new dna strand.*/
func DNA(s string) Dna {
	d := make(Dna, 4)
	d['G'] = 0
	d['T'] = 0
	d['A'] = 0
	d['C'] = 0
	
	for i := 0; i < len(s); i++ {
		n := s[i]
		if validNucleotides[n] {
			d[n]++
		}
	}
	return d
}

/*Count counts the occurances of a nucleotide in a dna strand.*/
func (d Dna) Count(n byte) (int, error) {
	if !validNucleotides[n] {
		return 0, fmt.Errorf("%q is not a valid nucleotide", n)
	}
	return d[n], nil
}

/*Counts counts the occurance of all valid nucleotides in a dna strand.*/
func (d Dna) Counts() Histogram {
	return Histogram(d)
}