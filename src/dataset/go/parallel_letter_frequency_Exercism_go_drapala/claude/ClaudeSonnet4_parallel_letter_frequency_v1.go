package letter

import "sync"

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

// Concurrent version of above
func ConcurrentFrequency(texts []string) FreqMap {
	if len(texts) == 0 {
		return FreqMap{}
	}
	
	if len(texts) == 1 {
		return Frequency(texts[0])
	}

	// Use buffered channel to avoid blocking
	c := make(chan FreqMap, len(texts))
	
	// Launch all goroutines first
	for _, text := range texts {
		go func(s string) {
			c <- Frequency(s)
		}(text)
	}

	// Collect all results
	m := FreqMap{}
	for i := 0; i < len(texts); i++ {
		result := <-c
		for k, v := range result {
			m[k] += v
		}
	}
	
	return m
}