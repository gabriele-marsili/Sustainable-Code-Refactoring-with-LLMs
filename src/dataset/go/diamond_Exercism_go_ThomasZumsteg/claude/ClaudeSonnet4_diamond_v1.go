package diamond

import (
	"errors"
	"strings"
)

func Gen(limit byte) (string, error) {
	if limit < byte('A') || byte('Z') < limit {
		return "", errors.New("Not a valid limit: " + string(limit))
	}
	length := int(limit - byte('A'))
	
	// Pre-calculate total size to avoid string concatenation overhead
	totalSize := (2*length + 1) * (2*length + 2) // rows * (width + newline)
	var builder strings.Builder
	builder.Grow(totalSize)
	
	// Create reusable byte slice instead of rune slice
	row := make([]byte, 2*length+1)
	
	for r := 0; r <= length; r++ {
		// Fill with spaces once
		for i := range row {
			row[i] = ' '
		}
		
		// Set the letters at calculated positions
		letter := byte('A' + r)
		row[length-r] = letter
		if r > 0 {
			row[length+r] = letter
		}
		
		// Write upper half
		builder.Write(row)
		builder.WriteByte('\n')
		
		// Write lower half (except middle row)
		if r < length {
			builder.Write(row)
			builder.WriteByte('\n')
		}
	}
	
	// Build the final result by writing lower half in reverse
	result := builder.String()
	lines := strings.Split(strings.TrimSuffix(result, "\n"), "\n")
	
	builder.Reset()
	builder.Grow(totalSize)
	
	// Write upper half
	for i := 0; i <= length; i++ {
		builder.WriteString(lines[i])
		builder.WriteByte('\n')
	}
	
	// Write lower half in reverse (excluding middle)
	for i := length - 1; i >= 0; i-- {
		builder.WriteString(lines[i])
		builder.WriteByte('\n')
	}
	
	return builder.String(), nil
}