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
	builder.Grow(dimension * dimension) // Pre-allocate capacity
	
	// Upper half including middle
	for i := 0; i <= n; i++ {
		buildRow(&builder, dimension, i)
		builder.WriteByte('\n')
	}
	
	// Lower half (reverse of upper half excluding middle)
	for i := n - 1; i >= 0; i-- {
		buildRow(&builder, dimension, i)
		builder.WriteByte('\n')
	}
	
	return builder.String(), nil
}

func buildRow(builder *strings.Builder, dimension int, rowNumber int) {
	leadingSpaces := (dimension-1)/2 - rowNumber
	character := byte('A' + rowNumber)
	
	// Leading spaces
	for i := 0; i < leadingSpaces; i++ {
		builder.WriteByte(' ')
	}
	
	// First character
	builder.WriteByte(character)
	
	if rowNumber == 0 {
		// For 'A', just add trailing spaces
		for i := 0; i < leadingSpaces; i++ {
			builder.WriteByte(' ')
		}
		return
	}
	
	// Middle spaces
	middleSpaces := rowNumber*2 - 1
	for i := 0; i < middleSpaces; i++ {
		builder.WriteByte(' ')
	}
	
	// Second character
	builder.WriteByte(character)
	
	// Trailing spaces
	for i := 0; i < leadingSpaces; i++ {
		builder.WriteByte(' ')
	}
}