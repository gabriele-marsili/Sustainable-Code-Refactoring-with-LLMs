package diamond

import (
	"fmt"
	"strings"
)

func Gen(char byte) (string, error) {
	// Distance from A
	input_num := int(char) - int('A')

	// Error handling
	if input_num < 0 || input_num > 25 { // Outside of A - Z
		return "", fmt.Errorf("invalid input: %s", string(char))
	}

	if input_num == 0 {
		return "A\n", nil
	}

	dimension := input_num*2 + 1
	var result strings.Builder
	result.Grow(dimension * (dimension + 1)) // Pre-allocate capacity

	// Generate upper half (including middle)
	for row := 0; row <= input_num; row++ {
		currentChar := byte('A' + row)
		outerSpaces := input_num - row
		
		// Add leading spaces
		for i := 0; i < outerSpaces; i++ {
			result.WriteByte(' ')
		}
		
		// Add first character
		result.WriteByte(currentChar)
		
		// Add middle spaces and second character (if not 'A')
		if row > 0 {
			innerSpaces := row*2 - 1
			for i := 0; i < innerSpaces; i++ {
				result.WriteByte(' ')
			}
			result.WriteByte(currentChar)
		}
		
		// Add trailing spaces
		for i := 0; i < outerSpaces; i++ {
			result.WriteByte(' ')
		}
		
		result.WriteByte('\n')
	}

	// Generate lower half
	for row := input_num - 1; row >= 0; row-- {
		currentChar := byte('A' + row)
		outerSpaces := input_num - row
		
		// Add leading spaces
		for i := 0; i < outerSpaces; i++ {
			result.WriteByte(' ')
		}
		
		// Add first character
		result.WriteByte(currentChar)
		
		// Add middle spaces and second character (if not 'A')
		if row > 0 {
			innerSpaces := row*2 - 1
			for i := 0; i < innerSpaces; i++ {
				result.WriteByte(' ')
			}
			result.WriteByte(currentChar)
		}
		
		// Add trailing spaces
		for i := 0; i < outerSpaces; i++ {
			result.WriteByte(' ')
		}
		
		result.WriteByte('\n')
	}

	return result.String(), nil
}