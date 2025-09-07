package strand

import "strings"

func ToRNA(dna string) string {
	var builder strings.Builder
	builder.Grow(len(dna))

	for _, value := range dna {
		switch value {
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