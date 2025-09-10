package diamond

import (
	"fmt"
	"strings"
)

type board struct {
	rows      string
	dimension int
	char      byte
}

func (b *board) generateBoard() {
	var sb strings.Builder
	half := b.dimension / 2

	for row := 0; row < b.dimension; row++ {
		currentChar := 'A' + byte(row)
		if row > half {
			currentChar = b.char - byte(row-half)
		}

		for pos := 0; pos < b.dimension; pos++ {
			if pos == half-row || pos == half+row || (row > half && (pos == row-half || pos == b.dimension-(row-half)-1)) {
				sb.WriteByte(currentChar)
			} else {
				sb.WriteByte(' ')
			}
		}
		sb.WriteByte('\n')
	}

	b.rows = sb.String()
}

func Gen(char byte) (string, error) {
	if char < 'A' || char > 'Z' {
		return "", fmt.Errorf("invalid input: %s", string(char))
	}

	my_board := board{
		dimension: int(char-'A')*2 + 1,
		char:      char,
	}
	my_board.generateBoard()

	return my_board.rows, nil
}