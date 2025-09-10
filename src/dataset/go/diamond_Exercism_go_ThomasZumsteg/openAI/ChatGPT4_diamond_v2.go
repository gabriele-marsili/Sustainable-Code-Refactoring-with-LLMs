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
	var sb strings.Builder
	for r := 0; r <= length; r++ {
		writeRow(&sb, r, length)
	}
	for r := length - 1; r >= 0; r-- {
		writeRow(&sb, r, length)
	}
	return sb.String(), nil
}

func writeRow(sb *strings.Builder, r, length int) {
	for col := 0; col <= 2*length; col++ {
		if col == length+r || col == length-r {
			sb.WriteByte('A' + byte(r))
		} else {
			sb.WriteByte(' ')
		}
	}
	sb.WriteByte('\n')
}