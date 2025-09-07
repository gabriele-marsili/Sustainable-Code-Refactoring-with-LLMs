package strand

const TestVersion = 1

var dnaToRna = map[rune]rune{
	'G': 'C',
	'C': 'G',
	'T': 'A',
	'A': 'U',
}

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