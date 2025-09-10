package diamond

import (
	"fmt"
	"strings"
)

func Gen(char byte) (string, error) {
	inputNum := int(char) - int('A')

	if inputNum < 0 || inputNum > 25 {
		return "", fmt.Errorf("invalid input: %s", string(char))
	}

	dimension := inputNum*2 + 1
	rows := make([]string, dimension)

	for row := 0; row < dimension; row++ {
		currentRow := strings.Repeat(" ", dimension)
		rowIndex := row
		if row > inputNum {
			rowIndex = dimension - 1 - row
		}

		charIndex := inputNum - rowIndex
		currentRowBytes := []byte(currentRow)
		currentRowBytes[charIndex] = byte(char - byte(rowIndex))
		currentRowBytes[dimension-1-charIndex] = byte(char - byte(rowIndex))
		rows[row] = string(currentRowBytes)
	}

	return strings.Join(rows, "\n"), nil
}