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
	row := make([]byte, 2*length+1)
	for i := range row {
		row[i] = ' '
	}
	for r := 0; r <= length; r++ {
		letter := byte('A' + r)
		row[length-r], row[length+r] = letter, letter
		sb.Write(row)
		sb.WriteByte('\n')
		if r < length {
			sb.WriteString(sb.String()[:sb.Len()-2*(2*length+2)])
		}
		row[length-r], row[length+r] = ' ', ' '
	}
	return sb.String(), nil
}