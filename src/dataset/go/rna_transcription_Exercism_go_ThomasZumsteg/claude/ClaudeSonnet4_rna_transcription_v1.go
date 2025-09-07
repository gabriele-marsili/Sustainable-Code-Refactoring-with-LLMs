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
	if len(dnaStrand) == 0 {
		return ""
	}
	
	result := make([]rune, 0, len(dnaStrand))
	for _, dna := range dnaStrand {
		if rna, exists := dnaToRna[dna]; exists {
			result = append(result, rna)
		}
	}
	return string(result)
}