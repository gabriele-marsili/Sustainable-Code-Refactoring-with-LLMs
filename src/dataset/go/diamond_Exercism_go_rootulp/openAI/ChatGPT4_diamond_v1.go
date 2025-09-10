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
	headerRows := header(dimension)
	middleRow := middle(dimension, rune(char))
	footerRows := reverse(headerRows)

	var sb strings.Builder
	for _, row := range headerRows {
		sb.WriteString(row)
		sb.WriteByte('\n')
	}
	sb.WriteString(middleRow)
	sb.WriteByte('\n')
	for _, row := range footerRows {
		sb.WriteString(row)
		sb.WriteByte('\n')
	}

	return sb.String(), nil
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

	var sb strings.Builder
	sb.WriteString(strings.Repeat(" ", leadingSpaces))
	sb.WriteByte(byte(character))
	if rowNumber > 0 {
		sb.WriteString(strings.Repeat(" ", middleSpaces))
		sb.WriteByte(byte(character))
	}
	sb.WriteString(strings.Repeat(" ", leadingSpaces))
	return sb.String()
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
	var sb strings.Builder
	sb.WriteByte(byte(character))
	sb.WriteString(strings.Repeat(" ", middleSpaces(dimension, headerLength(dimension))))
	sb.WriteByte(byte(character))
	return sb.String()
}

func footer(dimension int) []string {
	return reverse(header(dimension))
}

func reverse(rows []string) []string {
	length := len(rows)
	reversed := make([]string, length)
	for i := 0; i < length; i++ {
		reversed[i] = rows[length-1-i]
	}
	return reversed
}

func getDimension(char rune) int {
	return int(char-'A')*2 + 1
}