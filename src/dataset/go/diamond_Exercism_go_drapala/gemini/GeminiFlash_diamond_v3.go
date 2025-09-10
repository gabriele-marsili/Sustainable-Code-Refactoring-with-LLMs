package diamond

import (
	"fmt"
	"strings"
)

type board struct {
	rows      strings.Builder // Finished board
	dimension int             // Length, Height
	char      byte            // Char to get to before flipping
}

func (b *board) generateBoard() {
	i := int(b.char) - int('A')
	half := b.dimension / 2

	for row := 0; row < b.dimension; row++ {
		for col := 0; col < b.dimension; col++ {
			dist := abs(col - i)
			rowDist := abs(row - half)

			if dist+rowDist <= half {
				charVal := 'A' + abs(half-max(dist, rowDist))
				b.rows.WriteRune(charVal)
			} else {
				b.rows.WriteString(" ")
			}
		}
		b.rows.WriteString("\n")
	}
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
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

	return myBoard.rows.String(), nil
}