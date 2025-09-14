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
	b.rows.Reset()
	b.rows.Grow(b.dimension * (b.dimension + 1))
	
	charIndex := int(b.char) - int('A')
	half := charIndex + 1
	
	for row := 0; row < b.dimension; row++ {
		var currentChar byte
		var leftPos, rightPos int
		
		if row < half {
			currentChar = byte(int('A') + row)
			leftPos = charIndex - row
			rightPos = charIndex + row
		} else {
			currentChar = byte(int('A') + (b.dimension - 1 - row))
			leftPos = row - charIndex
			rightPos = b.dimension - 1 - (row - charIndex)
		}
		
		for pos := 0; pos < b.dimension; pos++ {
			if pos == leftPos || pos == rightPos {
				b.rows.WriteByte(currentChar)
			} else {
				b.rows.WriteByte(' ')
			}
		}
		b.rows.WriteByte('\n')
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
	
	return myBoard.rows.String(), nil
}