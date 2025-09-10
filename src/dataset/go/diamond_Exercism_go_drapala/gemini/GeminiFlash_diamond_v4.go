package diamond

import (
	"fmt"
	"strings"
)

type board struct {
	rows      strings.Builder
	dimension int
	char      byte
}

func (b *board) generateBoard() {
	i := int(b.char) - int('A')
	dimension := b.dimension

	for row := 1; row <= dimension; row++ {
		for pos := 0; pos < dimension; pos++ {
			if abs(pos-i) == row-1 {
				ascii := 'A' + row - 1
				b.rows.WriteRune(rune(ascii))
			} else if abs(pos-i) == dimension-row {
				ascii := b.char - byte(row-1) + byte(i) - byte(int('A'))
				b.rows.WriteByte(ascii)
			} else {
				b.rows.WriteByte(' ')
			}
		}
		b.rows.WriteByte('\n')
	}
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func Gen(char byte) (string, error) {
	inputNum := int(char) - int('A')

	if inputNum < 0 || inputNum > 25 {
		return "", fmt.Errorf("invalid input: %s", string(char))
	}

	myBoard := board{dimension: inputNum*2 + 1, char: char}
	myBoard.generateBoard()

	return myBoard.rows.String(), nil
}