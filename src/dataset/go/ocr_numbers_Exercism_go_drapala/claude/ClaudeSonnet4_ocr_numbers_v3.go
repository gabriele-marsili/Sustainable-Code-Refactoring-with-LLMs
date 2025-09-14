package ocr

import (
	"strings"
	"sync"
)

var (
	digitPatterns = [10][4]string{
		{" _ ", "| |", "|_|", "   "}, // 0
		{"   ", "  |", "  |", "   "}, // 1
		{" _ ", " _|", "|_ ", "   "}, // 2
		{" _ ", " _|", " _|", "   "}, // 3
		{"   ", "|_|", "  |", "   "}, // 4
		{" _ ", "|_ ", " _|", "   "}, // 5
		{" _ ", "|_ ", "|_|", "   "}, // 6
		{" _ ", "  |", "  |", "   "}, // 7
		{" _ ", "|_|", "|_|", "   "}, // 8
		{" _ ", "|_|", " _|", "   "}, // 9
	}
	
	patternPool = sync.Pool{
		New: func() interface{} {
			return make([]string, 0, 10)
		},
	}
)

func Recognize(input string) []string {
	if input == "" {
		return []string{}
	}
	
	lines := strings.Split(input, "\n")
	if len(lines) != 4 {
		return []string{}
	}
	
	if len(lines[0]) == 0 {
		return []string{}
	}
	
	numDigits := len(lines[0]) / 3
	if numDigits == 0 {
		return []string{}
	}
	
	result := patternPool.Get().([]string)
	result = result[:0]
	defer patternPool.Put(result)
	
	for i := 0; i < numDigits; i++ {
		start := i * 3
		end := start + 3
		
		if end > len(lines[0]) || end > len(lines[1]) || end > len(lines[2]) || end > len(lines[3]) {
			break
		}
		
		digitLines := [4]string{
			lines[0][start:end],
			lines[1][start:end],
			lines[2][start:end],
			lines[3][start:end],
		}
		
		digit := "?"
		for j, pattern := range digitPatterns {
			if digitLines == pattern {
				digit = string(rune('0' + j))
				break
			}
		}
		
		result = append(result, digit)
	}
	
	finalResult := make([]string, len(result))
	copy(finalResult, result)
	return finalResult
}