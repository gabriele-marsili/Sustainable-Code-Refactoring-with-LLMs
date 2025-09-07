package strand

func ToRNA(dna string) string {
	var rna []byte
	for i := 0; i < len(dna); i++ {
		switch dna[i] {
		case 'C':
			rna = append(rna, 'G')
		case 'G':
			rna = append(rna, 'C')
		case 'T':
			rna = append(rna, 'A')
		case 'A':
			rna = append(rna, 'U')
		}
	}
	return string(rna)
}