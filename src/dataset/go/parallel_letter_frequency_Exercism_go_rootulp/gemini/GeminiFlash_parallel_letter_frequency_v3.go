package letter

import "sync"

// FreqMap records the frequency of each rune in a given text.
type FreqMap map[rune]int

// Frequency counts the frequency of each rune in a given text and returns this
// data as a FreqMap.
func Frequency(s string) FreqMap {
	m := make(FreqMap)
	for _, r := range s {
		m[r]++
	}
	return m
}

// ConcurrentFrequency counts the frequency of each rune in texts (concurrently)
// and returns a FreqMap.
func ConcurrentFrequency(texts []string) FreqMap {
	numTexts := len(texts)
	result := make(FreqMap)
	var wg sync.WaitGroup
	wg.Add(numTexts)

	var mu sync.Mutex

	for _, text := range texts {
		go func(t string) {
			defer wg.Done()
			freqMap := Frequency(t)
			mu.Lock()
			for r, count := range freqMap {
				result[r] += count
			}
			mu.Unlock()
		}(text)
	}

	wg.Wait()
	return result
}