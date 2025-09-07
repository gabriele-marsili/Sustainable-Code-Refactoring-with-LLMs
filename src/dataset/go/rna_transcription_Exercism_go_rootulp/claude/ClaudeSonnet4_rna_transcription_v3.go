package strand

var dnaToRna = map[rune]rune{
	'C': 'G',
	'G': 'C',
	'T': 'A',
	'A': 'U',
}

func ToRNA(dna string) string {
	if len(dna) == 0 {
		return ""
	}
	
	result := make([]byte, len(dna))
	for i, r := range dna {
		result[i] = byte(dnaToRna[r])
	}
	return string(result)
}