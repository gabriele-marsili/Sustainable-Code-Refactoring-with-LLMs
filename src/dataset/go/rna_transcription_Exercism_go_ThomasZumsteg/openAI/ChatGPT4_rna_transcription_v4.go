package strand

const TestVersion = 1

var dnaToRna = map[rune]rune{
	'G': 'C',
	'C': 'G',
	'T': 'A',
	'A': 'U',
}

func ToRna(dnaStrand string) string {
	rnaStrand := make([]rune, len(dnaStrand))
	for i, dna := range dnaStrand {
		rnaStrand[i] = dnaToRna[dna]
	}
	return string(rnaStrand)
}