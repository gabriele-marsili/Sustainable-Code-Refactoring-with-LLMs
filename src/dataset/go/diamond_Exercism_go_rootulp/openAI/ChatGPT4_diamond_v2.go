package diamond

import (
	"fmt"
	"strings"
)

func Gen(char byte) (result string, err error) {
	if char < 'A' || char > 'Z' {
		return "", fmt.Errorf("char %v is not a valid capital letter", char)
	}
	if char == 'A' {
		return "A\n", nil
	}

	dimension := getDimension(rune(char))
	rows := make([]string, 0, dimension)
	headerLength := (dimension - 1) / 2

	for rowNumber := 0; rowNumber <= headerLength; rowNumber++ {
		rows = append(rows, buildRow(dimension, rowNumber))
	}
	for rowNumber := headerLength - 1; rowNumber >= 0; rowNumber-- {
		rows = append(rows, rows[rowNumber])
	}

	return strings.Join(rows, "\n") + "\n", nil
}

func buildRow(dimension, rowNumber int) string {
	leadingSpaces := (dimension - 1) / 2 - rowNumber
	character := rune('A' + rowNumber)
	middleSpaces := rowNumber*2 - 1

	var sb strings.Builder
	sb.Grow(dimension)
	sb.WriteString(strings.Repeat(" ", leadingSpaces))
	sb.WriteByte(byte(character))
	if rowNumber > 0 {
		sb.WriteString(strings.Repeat(" ", middleSpaces))
		sb.WriteByte(byte(character))
	}
	sb.WriteString(strings.Repeat(" ", leadingSpaces))
	return sb.String()
}

func getDimension(char rune) int {
	return int(char-'A')*2 + 1
}