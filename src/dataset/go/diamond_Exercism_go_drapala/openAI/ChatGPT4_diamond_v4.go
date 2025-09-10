package diamond

import (
	"fmt"
	"strings"
)

type board struct {
	rows      []string // Finished board
	dimension int      // Length, Height
	char      byte     // Char to get to before flipping
}

func (b *board) generateBoard() {
	i := int(b.char) - int('A') // Distance from A
	half := b.dimension / 2

	for row := 0; row < b.dimension; row++ {
		line := make([]byte, b.dimension)
		for pos := range line {
			line[pos] = ' '
		}

		if row <= half {
			line[half-row] = 'A' + byte(row)
			line[half+row] = 'A' + byte(row)
		} else {
			mirrorRow := b.dimension - row - 1
			line[half-mirrorRow] = 'A' + byte(mirrorRow)
			line[half+mirrorRow] = 'A' + byte(mirrorRow)
		}

		b.rows = append(b.rows, string(line))
	}
}

func Gen(char byte) (string, error) {
	inputNum := int(char) - int('A')

	if inputNum < 0 || inputNum > 25 {
		return "", fmt.Errorf("invalid input: %s", string(char))
	}

	myBoard := board{
		dimension: inputNum*2 + 1,
		char:      char,
	}

	myBoard.generateBoard()

	return strings.Join(myBoard.rows, "\n") + "\n", nil
}