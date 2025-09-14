package transpose

import (
	"strings"
)

func Transpose(input []string) (result []string) {
	if len(input) == 0 {
		return []string{}
	}
	
	maxLen := maxLineLength(input)
	if maxLen == 0 {
		return []string{}
	}
	
	result = make([]string, maxLen)
	builder := make([]strings.Builder, maxLen)
	
	for i := range builder {
		builder[i].Grow(len(input))
	}
	
	for rowIdx, row := range input {
		maxLenFromRow := maxLineLength(input[rowIdx:])
		
		for colIdx := 0; colIdx < maxLenFromRow; colIdx++ {
			if colIdx < len(row) {
				builder[colIdx].WriteByte(row[colIdx])
			} else {
				builder[colIdx].WriteByte(' ')
			}
		}
	}
	
	for i := range builder {
		result[i] = builder[i].String()
	}
	
	return result
}

func transpose(input []string) (transposed [][]string) {
	if len(input) == 0 {
		return [][]string{}
	}
	
	maxLen := maxLineLength(input)
	transposed = make([][]string, maxLen)
	
	for col := 0; col < maxLen; col++ {
		transposed[col] = make([]string, 0, len(input))
	}
	
	for _, row := range input {
		for col := 0; col < maxLen; col++ {
			if col < len(row) {
				transposed[col] = append(transposed[col], string(row[col]))
			} else {
				transposed[col] = append(transposed[col], " ")
			}
		}
	}
	
	return transposed
}

func padInput(input []string) (padded []string) {
	if len(input) == 0 {
		return []string{}
	}
	
	padded = make([]string, len(input))
	
	for i, line := range input {
		lineLength := maxLineLength(input[i:])
		padded[i] = pad(line, lineLength)
	}
	
	return padded
}

func pad(line string, lineLength int) (padded string) {
	if len(line) >= lineLength {
		return line
	}
	
	var builder strings.Builder
	builder.Grow(lineLength)
	builder.WriteString(line)
	
	for i := len(line); i < lineLength; i++ {
		builder.WriteByte(' ')
	}
	
	return builder.String()
}

func maxLineLength(input []string) (max int) {
	for _, line := range input {
		if len(line) > max {
			max = len(line)
		}
	}
	return max
}