package strand

//TestVersion is the unit tests that these functions will pass
const TestVersion = 1

//dnaToRna maps a dna nucleotide to an rna nucleotide
var dnaToRna = map[rune]string{
	'G': "C",
	'C': "G",
	'T': "A",
	'A': "U",
}

/*ToRna converts a string of dna to rna*/
func ToRna(dnaStrand string) string {
	rnaStrand := make([]byte, len(dnaStrand))
	for i := 0; i < len(dnaStrand); i++ {
		rnaStrand[i] = dnaToRna[rune(dnaStrand[i])][0]
	}
	return string(rnaStrand)
}