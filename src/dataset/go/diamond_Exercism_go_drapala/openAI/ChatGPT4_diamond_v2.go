package diamond

import (
	"fmt"
	"strings"
)

type board struct {
	rows      []string // Finished board as a slice of strings
	dimension int      // Length, Height
	char      byte     // Char to get to before flipping
}

func (b *board) generateBoard() {
	b.rows = make([]string, b.dimension) // Preallocate rows
	i := int(b.char) - int('A')          // Distance from A
	half := i + 1                        // Halfway point

	for row := 0; row < b.dimension; row++ {
		line := make([]byte, b.dimension) // Preallocate line
		for pos := 0; pos < b.dimension; pos++ {
			if pos == i-row || pos == i+row || pos == row-i || pos == 3*i-row {
				line[pos] = 'A' + byte(min(row, b.dimension-row-1))
			} else {
				line[pos] = ' '
			}
		}
		b.rows[row] = string(line)
	}
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func Gen(char byte) (string, error) {
	// Distance from A
	inputNum := int(char) - int('A')

	// Error handling
	if inputNum < 0 || inputNum > 25 { // Outside of A - Z
		return "", fmt.Errorf("invalid input: %s", string(char))
	}

	// Generate empty board
	myBoard := board{
		dimension: inputNum*2 + 1,
		char:      char,
	}

	// Fill board
	myBoard.generateBoard()

	return strings.Join(myBoard.rows, "\n"), nil
}