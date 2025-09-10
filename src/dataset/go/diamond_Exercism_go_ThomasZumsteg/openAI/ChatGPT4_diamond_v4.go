package diamond

import (
	"errors"
	"strings"
)

func Gen(limit byte) (string, error) {
	if limit < 'A' || limit > 'Z' {
		return "", errors.New("Not a valid limit: " + string(limit))
	}
	length := int(limit - 'A')
	var builder strings.Builder
	builder.Grow((2*length + 1) * (2*length + 2)) // Preallocate memory for the result

	for r := 0; r <= length; r++ {
		writeRow(&builder, r, length)
	}
	for r := length - 1; r >= 0; r-- {
		writeRow(&builder, r, length)
	}

	return builder.String(), nil
}

func writeRow(builder *strings.Builder, r, length int) {
	for col := 0; col <= 2*length; col++ {
		if col == length+r || col == length-r {
			builder.WriteByte('A' + byte(r))
		} else {
			builder.WriteByte(' ')
		}
	}
	builder.WriteByte('\n')
}