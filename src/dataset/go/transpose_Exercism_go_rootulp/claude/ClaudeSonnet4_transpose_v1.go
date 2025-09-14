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
	builders := make([]*strings.Builder, maxLen)
	for i := range builders {
		builders[i] = &strings.Builder{}
	}
	
	for i, line := range input {
		lineLen := len(line)
		maxLenForLine := maxLineLength(input[i:])
		
		for col := 0; col < maxLenForLine; col++ {
			if col < lineLen {
				builders[col].WriteByte(line[col])
			} else {
				builders[col].WriteByte(' ')
			}
		}
	}
	
	for i, builder := range builders {
		result[i] = builder.String()
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
		transposed[col] = make([]string, len(input))
		for row, line := range input {
			if col < len(line) {
				transposed[col][row] = string(line[col])
			} else {
				transposed[col][row] = " "
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
	maxLengths := make([]int, len(input))
	
	for i := len(input) - 1; i >= 0; i-- {
		if i == len(input)-1 {
			maxLengths[i] = len(input[i])
		} else {
			maxLengths[i] = max(len(input[i]), maxLengths[i+1])
		}
	}
	
	for i, line := range input {
		padded[i] = pad(line, maxLengths[i])
	}
	return padded
}

func pad(line string, lineLength int) (padded string) {
	if len(line) >= lineLength {
		return line
	}
	
	builder := strings.Builder{}
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

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}