package letter

import "sync"

// FreqMap records the frequency of each rune in a given text.
type FreqMap map[rune]int

// Frequency counts the frequency of each rune in a given text and returns this
// data as a FreqMap.
func Frequency(s string) FreqMap {
	m := make(FreqMap, len(s)) // Pre-allocate map with a reasonable size
	for _, r := range s {
		m[r]++
	}
	return m
}

// ConcurrentFrequency counts the frequency of each rune in texts (concurrently)
// and returns a FreqMap.
func ConcurrentFrequency(texts []string) FreqMap {
	numTexts := len(texts)
	freqMaps := make(chan FreqMap, numTexts)
	var wg sync.WaitGroup

	for _, text := range texts {
		wg.Add(1)
		go func(t string, c chan<- FreqMap) {
			defer wg.Done()
			c <- Frequency(t)
		}(text, freqMaps)
	}

	wg.Wait()
	close(freqMaps)

	result := make(FreqMap)

	for freqMap := range freqMaps {
		for r, count := range freqMap {
			result[r] += count
		}
	}

	return result
}