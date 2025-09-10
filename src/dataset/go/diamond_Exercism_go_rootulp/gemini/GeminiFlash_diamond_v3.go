package diamond

import (
	"fmt"
	"strings"
)

func Gen(char byte) (string, error) {
	if char < 'A' || char > 'Z' {
		return "", fmt.Errorf("char %v is not a valid capital letter", char)
	}
	if char == 'A' {
		return "A\n", nil
	}

	dimension := getDimension(rune(char))
	rows := make([]string, 0, dimension)

	headerLength := (dimension - 1) / 2

	// Header
	for rowNumber := 0; rowNumber < headerLength; rowNumber++ {
		leadingSpaces := headerLength - rowNumber
		character := rune('A' + rowNumber)
		middleSpaces := rowNumber*2 - 1

		row := strings.Repeat(" ", leadingSpaces)
		row += string(character)
		if rowNumber > 0 {
			row += strings.Repeat(" ", middleSpaces)
			row += string(character)
		}
		row += strings.Repeat(" ", leadingSpaces)
		rows = append(rows, row)
	}

	// Middle
	middleSpaces := headerLength*2 - 1
	middleRow := string(rune(char)) + strings.Repeat(" ", middleSpaces) + string(rune(char))
	rows = append(rows, middleRow)

	// Footer
	for i := headerLength - 1; i >= 0; i-- {
		rows = append(rows, rows[i])
	}

	return strings.Join(rows, "\n") + "\n", nil
}

func getDimension(char rune) int {
	return int(char-'A')*2 + 1
}