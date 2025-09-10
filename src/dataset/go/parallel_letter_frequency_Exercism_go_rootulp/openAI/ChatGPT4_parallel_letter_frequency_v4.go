package letter

import "sync"

// FreqMap records the frequency of each rune in a given text.
type FreqMap map[rune]int

// Frequency counts the frequency of each rune in a given text and returns this
// data as a FreqMap.
func Frequency(s string) FreqMap {
	m := FreqMap{}
	for _, r := range s {
		m[r]++
	}
	return m
}

// ConcurrentFrequency counts the frequency of each rune in texts (concurrently)
// and returns a FreqMap.
func ConcurrentFrequency(texts []string) FreqMap {
	var wg sync.WaitGroup
	result := make(FreqMap)
	mu := sync.Mutex{}

	wg.Add(len(texts))
	for _, text := range texts {
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