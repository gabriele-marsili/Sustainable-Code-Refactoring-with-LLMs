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
	charIndex := int(b.char) - int('A')
	
	b.rows.Grow(b.dimension * (b.dimension + 1))
	
	for row := 0; row < b.dimension; row++ {
		currentChar := byte('A')
		if row <= charIndex {
			currentChar += byte(row)
		} else {
			currentChar += byte(b.dimension - 1 - row)
		}
		
		spaces := charIndex - int(currentChar-'A')
		
		for i := 0; i < spaces; i++ {
			b.rows.WriteByte(' ')
		}
		
		b.rows.WriteByte(currentChar)
		
		if currentChar != 'A' {
			for i := 0; i < 2*(int(currentChar-'A'))-1; i++ {
				b.rows.WriteByte(' ')
			}
			b.rows.WriteByte(currentChar)
		}
		
		for i := 0; i < spaces; i++ {
			b.rows.WriteByte(' ')
		}
		
		if row < b.dimension-1 {
			b.rows.WriteByte('\n')
		}
	}
}

func Gen(char byte) (string, error) {
	if char < 'A' || char > 'Z' {
		return "", fmt.Errorf("invalid input: %s", string(char))
	}

	charIndex := int(char) - int('A')
	
	myBoard := board{
		dimension: charIndex*2 + 1,
		char:      char,
	}

	myBoard.generateBoard()
	return myBoard.rows.String(), nil
}