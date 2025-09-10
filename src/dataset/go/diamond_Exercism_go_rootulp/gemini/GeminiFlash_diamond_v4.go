package diamond

import (
	"fmt"
	"strings"
)

func Gen(char byte) (string, error) {
	if char < 'A' || char > 'Z' {
		return "", fmt.Errorf("char %v is not a valid capital letter", char)
	}

	n := int(char - 'A')
	width := 2*n + 1
	result := make([]string, width)

	for i := 0; i <= n; i++ {
		row := make([]byte, width)
		for j := range row {
			row[j] = ' '
		}
		char := byte('A' + i)
		row[n-i] = char
		row[n+i] = char
		result[i] = string(row)
		result[width-1-i] = string(row)
	}

	return strings.Join(result, "\n") + "\n", nil
}