package strand

func ToRNA(dna string) string {
	if len(dna) == 0 {
		return ""
	}

	rna := make([]byte, len(dna))
	
	for i, nucleotide := range []byte(dna) {
		switch nucleotide {
		case 'G':
			rna[i] = 'C'
		case 'C':
			rna[i] = 'G'
		case 'T':
			rna[i] = 'A'
		case 'A':
			rna[i] = 'U'
		}
	}
	
	return string(rna)
}