package letter

import (
	"sync"
)

// FreqMap records the frequency of each rune in a given text.
type FreqMap map[rune]int

// Frequency counts the frequency of each rune in a given text and returns this
// data as a FreqMap.
func Frequency(s string) FreqMap {
	m := make(FreqMap, len(s)/4) // Pre-allocate with estimated capacity
	for _, r := range s {
		m[r]++
	}
	return m
}

// ConcurrentFrequency counts the frequency of each rune in texts (concurrently)
// and returns a FreqMap.
func ConcurrentFrequency(texts []string) FreqMap {
	if len(texts) == 0 {
		return make(FreqMap)
	}
	
	if len(texts) == 1 {
		return Frequency(texts[0])
	}

	var wg sync.WaitGroup
	var mu sync.Mutex
	result := make(FreqMap)

	for _, text := range texts {
		wg.Add(1)
		go func(t string) {
			defer wg.Done()
			localFreq := Frequency(t)
			
			mu.Lock()
			for r, count := range localFreq {
				result[r] += count
			}
			mu.Unlock()
		}(text)
	}

	wg.Wait()
	return result
}