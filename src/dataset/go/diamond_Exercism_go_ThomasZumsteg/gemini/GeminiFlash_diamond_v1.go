package diamond

import (
	"errors"
	"strings"
)

func Gen(limit byte) (string, error) {
	if limit < 'A' || 'Z' < limit {
		return "", errors.New("invalid input")
	}

	size := int(limit - 'A')
	diamond := make([]string, 2*size+1)

	for i := 0; i <= size; i++ {
		row := make([]byte, 2*size+1)
		for j := range row {
			row[j] = ' '
		}

		letter := byte('A' + i)
		row[size-i] = letter
		row[size+i] = letter

		rowStr := string(row)
		diamond[i] = rowStr
		diamond[2*size-i] = rowStr
	}

	return strings.Join(diamond, "\n") + "\n", nil
}