package strand

var dnaToRna = map[rune]rune{
	'C': 'G',
	'G': 'C',
	'T': 'A',
	'A': 'U',
}

func ToRNA(dna string) string {
	rna := make([]byte, len(dna))
	for i := 0; i < len(dna); i++ {
		rna[i] = byte(dnaToRna[rune(dna[i])])
	}
	return string(rna)
}