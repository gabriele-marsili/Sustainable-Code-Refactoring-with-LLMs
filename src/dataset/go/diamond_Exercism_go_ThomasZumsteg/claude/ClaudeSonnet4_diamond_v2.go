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
	size := 2*length + 1
	
	var builder strings.Builder
	builder.Grow((size + 1) * size) // Pre-allocate capacity
	
	// Generate upper half and middle
	for r := 0; r <= length; r++ {
		// Left padding
		for i := 0; i < length-r; i++ {
			builder.WriteByte(' ')
		}
		
		// Letter
		letter := byte('A' + r)
		builder.WriteByte(letter)
		
		// Middle spacing (only if not 'A')
		if r > 0 {
			for i := 0; i < 2*r-1; i++ {
				builder.WriteByte(' ')
			}
			builder.WriteByte(letter)
		}
		
		// Right padding
		for i := 0; i < length-r; i++ {
			builder.WriteByte(' ')
		}
		
		builder.WriteByte('\n')
	}
	
	// Generate lower half (mirror of upper half, excluding middle)
	for r := length - 1; r >= 0; r-- {
		// Left padding
		for i := 0; i < length-r; i++ {
			builder.WriteByte(' ')
		}
		
		// Letter
		letter := byte('A' + r)
		builder.WriteByte(letter)
		
		// Middle spacing (only if not 'A')
		if r > 0 {
			for i := 0; i < 2*r-1; i++ {
				builder.WriteByte(' ')
			}
			builder.WriteByte(letter)
		}
		
		// Right padding
		for i := 0; i < length-r; i++ {
			builder.WriteByte(' ')
		}
		
		builder.WriteByte('\n')
	}
	
	return builder.String(), nil
}