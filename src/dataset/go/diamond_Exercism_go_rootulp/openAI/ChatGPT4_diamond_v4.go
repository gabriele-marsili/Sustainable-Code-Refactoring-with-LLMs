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
	headerRows := generateRows(dimension, 0, headerLength(dimension))
	middleRow := middle(dimension, rune(char))
	footerRows := reverse(headerRows)

	return strings.Join(append(append(headerRows, middleRow), footerRows...), "\n") + "\n", nil
}

func generateRows(dimension, start, end int) []string {
	rows := make([]string, end-start)
	for i := start; i < end; i++ {
		rows[i-start] = row(dimension, i)
	}
	return rows
}

func row(dimension, rowNumber int) string {
	leadingSpaces := headerLength(dimension) - rowNumber
	character := rune('A' + rowNumber)
	middleSpaces := rowNumber*2 - 1

	if rowNumber == 0 {
		return strings.Repeat(" ", leadingSpaces) + string(character) + strings.Repeat(" ", leadingSpaces)
	}

	return strings.Repeat(" ", leadingSpaces) + string(character) + strings.Repeat(" ", middleSpaces) + string(character) + strings.Repeat(" ", leadingSpaces)
}

func headerLength(dimension int) int {
	return (dimension - 1) / 2
}

func middle(dimension int, character rune) string {
	middleSpaces := (dimension - 1)
	return string(character) + strings.Repeat(" ", middleSpaces) + string(character)
}

func reverse(rows []string) []string {
	for i, j := 0, len(rows)-1; i < j; i, j = i+1, j-1 {
		rows[i], rows[j] = rows[j], rows[i]
	}
	return rows
}

func getDimension(char rune) int {
	return int(char-'A')*2 + 1
}