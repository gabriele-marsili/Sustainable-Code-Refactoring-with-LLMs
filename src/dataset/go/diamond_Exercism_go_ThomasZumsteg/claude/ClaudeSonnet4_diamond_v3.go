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
	if length == 0 {
		return "A\n", nil
	}
	
	var builder strings.Builder
	size := 2*length + 1
	builder.Grow((size + 1) * size)
	
	row := make([]byte, size)
	
	for r := 0; r <= length; r++ {
		for i := range row {
			row[i] = ' '
		}
		
		letter := byte('A' + r)
		row[length-r] = letter
		if r > 0 {
			row[length+r] = letter
		}
		
		builder.Write(row)
		builder.WriteByte('\n')
		
		if r < length {
			for i := range row {
				row[i] = ' '
			}
			row[length-r] = letter
			if r > 0 {
				row[length+r] = letter
			}
		}
	}
	
	for r := length - 1; r >= 0; r-- {
		for i := range row {
			row[i] = ' '
		}
		
		letter := byte('A' + r)
		row[length-r] = letter
		if r > 0 {
			row[length+r] = letter
		}
		
		builder.Write(row)
		builder.WriteByte('\n')
	}
	
	return builder.String(), nil
}