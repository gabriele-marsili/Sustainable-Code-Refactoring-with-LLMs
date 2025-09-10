package ocr

import (
	"sync"
)

func Recognize(input string) []string {
	if input == "" {
		return []string{}
	}

	var wg sync.WaitGroup
	results := make([]string, len(input))
	mu := sync.Mutex{}

	for i, char := range input {
		wg.Add(1)
		go func(index int, c rune) {
			defer wg.Done()
			recognized := processChar(c)
			mu.Lock()
			results[index] = recognized
			mu.Unlock()
		}(i, char)
	}

	wg.Wait()
	return results
}

func processChar(c rune) string {
	// Simulated recognition logic
	return string(c)
}