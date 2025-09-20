package strand

func ToRNA(dna string) string {
	if len(dna) == 0 {
		return ""
	}

	var rnaBuilder []byte
	rnaBuilder = make([]byte, len(dna))

	for i, value := range dna {
		switch value {
		case 'G':
			rnaBuilder[i] = 'C'
		case 'C':
			rnaBuilder[i] = 'G'
		case 'T':
			rnaBuilder[i] = 'A'
		case 'A':
			rnaBuilder[i] = 'U'
		}
	}

	return string(rnaBuilder)
}