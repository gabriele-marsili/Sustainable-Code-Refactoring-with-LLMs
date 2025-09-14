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

	n := int(char - 'A')
	dimension := 2*n + 1
	
	var builder strings.Builder
	builder.Grow(dimension * dimension)
	
	// Top half including middle
	for i := 0; i <= n; i++ {
		leadingSpaces := n - i
		ch := byte('A' + i)
		
		// Leading spaces
		for j := 0; j < leadingSpaces; j++ {
			builder.WriteByte(' ')
		}
		
		// First character
		builder.WriteByte(ch)
		
		// Middle spaces and second character (if not 'A')
		if i > 0 {
			middleSpaces := 2*i - 1
			for j := 0; j < middleSpaces; j++ {
				builder.WriteByte(' ')
			}
			builder.WriteByte(ch)
		}
		
		// Trailing spaces
		for j := 0; j < leadingSpaces; j++ {
			builder.WriteByte(' ')
		}
		
		builder.WriteByte('\n')
	}
	
	// Bottom half (mirror of top half excluding middle)
	for i := n - 1; i >= 0; i-- {
		leadingSpaces := n - i
		ch := byte('A' + i)
		
		// Leading spaces
		for j := 0; j < leadingSpaces; j++ {
			builder.WriteByte(' ')
		}
		
		// First character
		builder.WriteByte(ch)
		
		// Middle spaces and second character (if not 'A')
		if i > 0 {
			middleSpaces := 2*i - 1
			for j := 0; j < middleSpaces; j++ {
				builder.WriteByte(' ')
			}
			builder.WriteByte(ch)
		}
		
		// Trailing spaces
		for j := 0; j < leadingSpaces; j++ {
			builder.WriteByte(' ')
		}
		
		builder.WriteByte('\n')
	}
	
	return builder.String(), nil
}

func header(dimension int) (rows []string) {
	headerLength := headerLength(dimension)
	rows = make([]string, 0, headerLength)
	for rowNumber := 0; rowNumber < headerLength; rowNumber++ {
		row := row(dimension, rowNumber)
		rows = append(rows, row)
	}
	return rows
}

func row(dimension int, rowNumber int) (result string) {
	leadingSpaces := leadingSpaces(dimension, rowNumber)
	character := characterForRow(rowNumber)
	middleSpaces := middleSpaces(dimension, rowNumber)

	if rowNumber == 0 {
		result += strings.Repeat(" ", leadingSpaces)
		result += string(character)
		result += strings.Repeat(" ", leadingSpaces)
		return result
	}

	result += strings.Repeat(" ", leadingSpaces)
	result += string(character)
	result += strings.Repeat(" ", middleSpaces)
	result += string(character)
	result += strings.Repeat(" ", leadingSpaces)
	return result
}

func headerLength(dimension int) int {
	return (dimension - 1) / 2
}

func leadingSpaces(dimension int, rowNumber int) (numSpaces int) {
	return headerLength(dimension) - rowNumber
}

func characterForRow(rowNumber int) rune {
	return rune('A' + rowNumber)
}

func middleSpaces(dimension int, rowNumber int) (numSpaces int) {
	if rowNumber == 0 {
		return 0
	}
	return rowNumber*2 - 1
}

func middle(dimension int, character rune) (row string) {
	row += string(character)
	row += strings.Repeat(" ", middleSpaces(dimension, headerLength(dimension)))
	row += string(character)

	return row
}

func footer(dimension int) (rows []string) {
	return reverse(header(dimension))
}

func reverse(rows []string) (reversed []string) {
	reversed = make([]string, len(rows))
	for i, row := range rows {
		reversed[len(rows)-1-i] = row
	}
	return reversed
}

func getDimension(char rune) (dimension int) {
	dimension = 1
	for char != 'A' {
		dimension += 2
		char -= 1
	}
	return dimension
}