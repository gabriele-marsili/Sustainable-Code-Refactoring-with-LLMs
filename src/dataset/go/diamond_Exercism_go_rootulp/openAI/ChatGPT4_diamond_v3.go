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
	rows = append(rows, header(dimension)...)
	rows = append(rows, middle(dimension, rune(char)))
	rows = append(rows, footer(dimension)...)
	return strings.Join(rows, "\n") + "\n", nil
}

func header(dimension int) []string {
	headerLength := headerLength(dimension)
	rows := make([]string, headerLength)
	for rowNumber := 0; rowNumber < headerLength; rowNumber++ {
		rows[rowNumber] = row(dimension, rowNumber)
	}
	return rows
}

func row(dimension int, rowNumber int) string {
	leadingSpaces := leadingSpaces(dimension, rowNumber)
	character := characterForRow(rowNumber)
	middleSpaces := middleSpaces(dimension, rowNumber)

	if rowNumber == 0 {
		return strings.Repeat(" ", leadingSpaces) + string(character) + strings.Repeat(" ", leadingSpaces)
	}

	return strings.Repeat(" ", leadingSpaces) + string(character) +
		strings.Repeat(" ", middleSpaces) + string(character) +
		strings.Repeat(" ", leadingSpaces)
}

func headerLength(dimension int) int {
	return (dimension - 1) / 2
}

func leadingSpaces(dimension int, rowNumber int) int {
	return headerLength(dimension) - rowNumber
}

func characterForRow(rowNumber int) rune {
	return rune('A' + rowNumber)
}

func middleSpaces(dimension int, rowNumber int) int {
	if rowNumber == 0 {
		return 0
	}
	return rowNumber*2 - 1
}

func middle(dimension int, character rune) string {
	return string(character) +
		strings.Repeat(" ", middleSpaces(dimension, headerLength(dimension))) +
		string(character)
}

func footer(dimension int) []string {
	headerRows := header(dimension)
	reversed := make([]string, len(headerRows))
	for i, row := range headerRows {
		reversed[len(headerRows)-1-i] = row
	}
	return reversed
}

func getDimension(char rune) int {
	return int(char-'A')*2 + 1
}