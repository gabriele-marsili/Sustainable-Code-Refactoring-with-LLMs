package diamond

import (
	"fmt"
	"strings"
)

func Gen(char byte) (string, error) {
	if char < 'A' || char > 'Z' {
		return "", fmt.Errorf("char %v is not a valid capital letter", char)
	}

	if char == 'A' {
		return "A\n", nil
	}

	n := int(char - 'A')
	width := 2*n + 1
	rows := make([]string, width)

	for i := 0; i <= n; i++ {
		row := make([]byte, width)
		for j := 0; j < width; j++ {
			row[j] = ' '
		}

		char := byte('A' + i)
		row[n-i] = char
		row[n+i] = char
		rows[i] = string(row)
		rows[width-1-i] = string(row)
	}

	return strings.Join(rows, "\n") + "\n", nil
}