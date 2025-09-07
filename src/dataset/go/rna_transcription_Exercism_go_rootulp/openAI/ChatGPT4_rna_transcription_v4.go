package strand

func ToRNA(dna string) string {
	rna := make([]byte, len(dna))
	for i, r := range dna {
		switch r {
		case 'C':
			rna[i] = 'G'
		case 'G':
			rna[i] = 'C'
		case 'T':
			rna[i] = 'A'
		case 'A':
			rna[i] = 'U'
		}
	}
	return string(rna)
}