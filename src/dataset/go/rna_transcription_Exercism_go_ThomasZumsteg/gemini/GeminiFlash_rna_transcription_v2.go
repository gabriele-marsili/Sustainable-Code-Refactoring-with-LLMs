package strand

//TestVersion is the unit tests that these functions will pass
const TestVersion = 1

//dnaToRna maps a dna nucleotide to an rna nucleotide
var dnaToRna = map[rune]rune{
	'G': 'C',
	'C': 'G',
	'T': 'A',
	'A': 'U',
}

/*ToRna converts a string of dna to rna*/
func ToRna(dnaStrand string) string {
	rnaStrand := make([]rune, len(dnaStrand))
	for i, dna := range dnaStrand {
		rnaStrand[i] = dnaToRna[dna]
	}
	return string(rnaStrand)
}