package letter

import (
	"sync"
)

// FreqMap records the frequency of each rune in a given text.
type FreqMap map[rune]int

// Frequency counts the frequency of each rune in a given text and returns this
// data as a FreqMap.
func Frequency(s string) FreqMap {
	if len(s) == 0 {
		return FreqMap{}
	}
	
	m := make(FreqMap, len(s)/2) // Pre-allocate with estimated capacity
	for _, r := range s {
		m[r]++
	}
	return m
}

// ConcurrentFrequency counts the frequency of each rune in texts (concurrently)
// and returns a FreqMap.
func ConcurrentFrequency(texts []string) FreqMap {
	if len(texts) == 0 {
		return FreqMap{}
	}
	
	if len(texts) == 1 {
		return Frequency(texts[0])
	}

	var wg sync.WaitGroup
	var mu sync.Mutex
	result := make(FreqMap)

	// Process texts in batches to limit goroutine overhead
	batchSize := 10
	if len(texts) < batchSize {
		batchSize = len(texts)
	}

	for i := 0; i < len(texts); i += batchSize {
		end := i + batchSize
		if end > len(texts) {
			end = len(texts)
		}

		wg.Add(1)
		go func(batch []string) {
			defer wg.Done()
			localResult := make(FreqMap)
			
			for _, text := range batch {
				for _, r := range text {
					localResult[r]++
				}
			}
			
			mu.Lock()
			for r, count := range localResult {
				result[r] += count
			}
			mu.Unlock()
		}(texts[i:end])
	}

	wg.Wait()
	return result
}