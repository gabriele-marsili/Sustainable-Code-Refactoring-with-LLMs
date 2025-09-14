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
	totalRows := dimension
	
	var builder strings.Builder
	builder.Grow(totalRows * dimension + totalRows) // Pre-allocate capacity
	
	headerLen := headerLength(dimension)
	
	// Generate header
	for rowNumber := 0; rowNumber < headerLen; rowNumber++ {
		writeRow(&builder, dimension, rowNumber)
		builder.WriteByte('\n')
	}
	
	// Generate middle
	writeMiddle(&builder, dimension, rune(char))
	builder.WriteByte('\n')
	
	// Generate footer (reverse of header)
	for rowNumber := headerLen - 1; rowNumber >= 0; rowNumber-- {
		writeRow(&builder, dimension, rowNumber)
		builder.WriteByte('\n')
	}
	
	return builder.String(), nil
}

func header(dimension int) (rows []string) {
	headerLen := headerLength(dimension)
	rows = make([]string, 0, headerLen)
	for rowNumber := 0; rowNumber < headerLen; rowNumber++ {
		row := row(dimension, rowNumber)
		rows = append(rows, row)
	}
	return rows
}

func row(dimension int, rowNumber int) (result string) {
	leadingSpaces := leadingSpaces(dimension, rowNumber)
	character := characterForRow(rowNumber)
	
	var builder strings.Builder
	builder.Grow(dimension)
	
	if rowNumber == 0 {
		writeSpaces(&builder, leadingSpaces)
		builder.WriteRune(character)
		writeSpaces(&builder, leadingSpaces)
		return builder.String()
	}

	middleSpaces := middleSpaces(dimension, rowNumber)
	writeSpaces(&builder, leadingSpaces)
	builder.WriteRune(character)
	writeSpaces(&builder, middleSpaces)
	builder.WriteRune(character)
	writeSpaces(&builder, leadingSpaces)
	return builder.String()
}

func writeRow(builder *strings.Builder, dimension int, rowNumber int) {
	leadingSpaces := leadingSpaces(dimension, rowNumber)
	character := characterForRow(rowNumber)
	
	if rowNumber == 0 {
		writeSpaces(builder, leadingSpaces)
		builder.WriteRune(character)
		writeSpaces(builder, leadingSpaces)
		return
	}

	middleSpaces := middleSpaces(dimension, rowNumber)
	writeSpaces(builder, leadingSpaces)
	builder.WriteRune(character)
	writeSpaces(builder, middleSpaces)
	builder.WriteRune(character)
	writeSpaces(builder, leadingSpaces)
}

func writeMiddle(builder *strings.Builder, dimension int, character rune) {
	builder.WriteRune(character)
	writeSpaces(builder, middleSpaces(dimension, headerLength(dimension)))
	builder.WriteRune(character)
}

func writeSpaces(builder *strings.Builder, count int) {
	for i := 0; i < count; i++ {
		builder.WriteByte(' ')
	}
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
	var builder strings.Builder
	builder.Grow(dimension)
	builder.WriteRune(character)
	writeSpaces(&builder, middleSpaces(dimension, headerLength(dimension)))
	builder.WriteRune(character)
	return builder.String()
}

func footer(dimension int) (rows []string) {
	headerRows := header(dimension)
	rows = make([]string, len(headerRows))
	for i, row := range headerRows {
		rows[len(headerRows)-1-i] = row
	}
	return rows
}

func reverse(rows []string) (reversed []string) {
	reversed = make([]string, len(rows))
	for i, row := range rows {
		reversed[len(rows)-1-i] = row
	}
	return reversed
}

func getDimension(char rune) (dimension int) {
	return int(char-'A')*2 + 1
}