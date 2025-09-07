package strand

import "strings"

func ToRNA(dna string) string {
	if len(dna) == 0 {
		return ""
	}

	var builder strings.Builder
	builder.Grow(len(dna))

	for i := 0; i < len(dna); i++ {
		switch dna[i] {
		case 'G':
			builder.WriteByte('C')
		case 'C':
			builder.WriteByte('G')
		case 'T':
			builder.WriteByte('A')
		case 'A':
			builder.WriteByte('U')
		}
	}

	return builder.String()
}