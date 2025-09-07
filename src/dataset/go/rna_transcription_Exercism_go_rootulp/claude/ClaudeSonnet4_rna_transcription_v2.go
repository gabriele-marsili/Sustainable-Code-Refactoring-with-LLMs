package strand

func ToRNA(dna string) string {
	if len(dna) == 0 {
		return ""
	}
	
	result := make([]byte, len(dna))
	for i := 0; i < len(dna); i++ {
		switch dna[i] {
		case 'C':
			result[i] = 'G'
		case 'G':
			result[i] = 'C'
		case 'T':
			result[i] = 'A'
		case 'A':
			result[i] = 'U'
		}
	}
	return string(result)
}