package diamond

import (
	"errors"
	"strings"
)

func Gen(limit byte) (string, error) {
	if limit < 'A' || 'Z' < limit {
		return "", errors.New("Not a valid limit: " + string(limit))
	}

	length := int(limit - 'A')
	size := 2*length + 1
	result := make([]string, size)

	for r := 0; r <= length; r++ {
		row := make([]byte, size)
		for i := range row {
			row[i] = ' '
		}

		letter := byte('A' + r)
		row[length+r] = letter
		row[length-r] = letter

		rowString := string(row)
		result[r] = rowString
		result[size-1-r] = rowString
	}

	return strings.Join(result, "\n") + "\n", nil
}