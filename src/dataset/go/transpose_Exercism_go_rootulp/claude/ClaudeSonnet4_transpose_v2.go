package transpose

import (
	"strings"
)

func Transpose(input []string) (result []string) {
	if len(input) == 0 {
		return []string{}
	}
	
	// Pre-calculate max lengths for each position
	maxLengths := make([]int, len(input))
	for i := range input {
		maxLengths[i] = maxLineLength(input[i:])
	}
	
	// Find overall max length
	overallMax := 0
	for _, length := range maxLengths {
		if length > overallMax {
			overallMax = length
		}
	}
	
	// Pre-allocate result slice
	result = make([]string, overallMax)
	
	// Build strings directly using string builder
	builders := make([]*strings.Builder, overallMax)
	for i := range builders {
		builders[i] = &strings.Builder{}
		builders[i].Grow(len(input)) // Pre-allocate capacity
	}
	
	// Process each input line
	for i, line := range input {
		lineLength := maxLengths[i]
		
		// Add characters to appropriate builders
		for j, char := range line {
			builders[j].WriteRune(char)
		}
		
		// Pad remaining positions with spaces
		for j := len(line); j < lineLength; j++ {
			builders[j].WriteByte(' ')
		}
	}
	
	// Convert builders to strings
	for i, builder := range builders {
		result[i] = builder.String()
	}
	
	return result
}

func maxLineLength(input []string) (max int) {
	for _, line := range input {
		if len(line) > max {
			max = len(line)
		}
	}
	return max
}