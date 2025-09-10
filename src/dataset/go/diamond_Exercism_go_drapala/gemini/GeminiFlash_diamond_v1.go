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
		currentRow := make([]byte, dimension)
		for i := 0; i < dimension; i++ {
			currentRow[i] = ' '
		}

		var currentChar byte
		rowIndex := row
		if row > inputNum {
			rowIndex = dimension - 1 - row
		}
		currentChar = byte('A' + rowIndex)

		columnIndex := inputNum - rowIndex
		currentRow[columnIndex] = currentChar

		columnIndex = inputNum + rowIndex
		currentRow[columnIndex] = currentChar

		rows[row] = string(currentRow)
	}

	return strings.Join(rows, "\n"), nil
}