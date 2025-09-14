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
	builder.Grow((size + 1) * size)
	
	spaces := make([]byte, length)
	for i := range spaces {
		spaces[i] = ' '
	}
	
	for r := 0; r <= length; r++ {
		leftSpaces := length - r
		rightSpaces := 2*r - 1
		letter := byte('A' + r)
		
		builder.Write(spaces[:leftSpaces])
		builder.WriteByte(letter)
		
		if rightSpaces > 0 {
			builder.Write(spaces[:rightSpaces])
			builder.WriteByte(letter)
		}
		
		builder.Write(spaces[:leftSpaces])
		builder.WriteByte('\n')
	}
	
	for r := length - 1; r >= 0; r-- {
		leftSpaces := length - r
		rightSpaces := 2*r - 1
		letter := byte('A' + r)
		
		builder.Write(spaces[:leftSpaces])
		builder.WriteByte(letter)
		
		if rightSpaces > 0 {
			builder.Write(spaces[:rightSpaces])
			builder.WriteByte(letter)
		}
		
		builder.Write(spaces[:leftSpaces])
		builder.WriteByte('\n')
	}
	
	return builder.String(), nil
}