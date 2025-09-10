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

// Concurrent version of above
func ConcurrentFrequency(texts []string) FreqMap {
	m := FreqMap{}
	var wg sync.WaitGroup
	mu := sync.Mutex{}

	for _, text := range texts {
		wg.Add(1)
		go func(t string) {
			defer wg.Done()
			localFreq := Frequency(t)
			mu.Lock()
			for k, v := range localFreq {
				m[k] += v
			}
			mu.Unlock()
		}(text)
	}

	wg.Wait()
	return m
}