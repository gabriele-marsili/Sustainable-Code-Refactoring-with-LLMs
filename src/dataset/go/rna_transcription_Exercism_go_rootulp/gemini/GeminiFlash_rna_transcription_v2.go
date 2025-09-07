package strand

var dnaToRna = map[rune]rune{
	'C': 'G',
	'G': 'C',
	'T': 'A',
	'A': 'U',
}

func ToRNA(dna string) string {
	rna := make([]byte, len(dna))
	for i, r := range dna {
		rna[i] = byte(dnaToRna[r])
	}
	return string(rna)
}