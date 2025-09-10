package diamond

import (
	"fmt"
	"strings"
)

type board struct {
	rows      strings.Builder // Efficient string concatenation
	dimension int             // Length, Height
	char      byte            // Char to get to before flipping
}

func (b *board) generateBoard() {
	i := int(b.char) - int('A') // Distance from A
	half := i + 1               // Halfway point

	for row := 1; row <= b.dimension; row++ {
		currentChar := 'A' + i
		if row <= half {
			currentChar = 'A' + row - 1
		} else {
			currentChar = 'A' + b.dimension - row
		}

		for pos := 0; pos < b.dimension; pos++ {
			if pos == half-row || pos == half+row-2 || pos == row-half || pos == b.dimension-row+half-1 {
				b.rows.WriteByte(byte(currentChar))
			} else {
				b.rows.WriteByte(' ')
			}
		}
		b.rows.WriteByte('\n')
	}
}

func Gen(char byte) (string, error) {
	// Distance from A
	inputNum := int(char) - int('A')

	// Error handling
	if inputNum < 0 || inputNum > 25 { // Outside of A - Z
		return "", fmt.Errorf("invalid input: %s", string(char))
	}

	// Generate empty board
	myBoard := board{}
	myBoard.dimension = inputNum*2 + 1
	myBoard.char = char

	// Fill board
	myBoard.generateBoard()

	return myBoard.rows.String(), nil
}