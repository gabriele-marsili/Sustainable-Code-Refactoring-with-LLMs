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

// ConcurrentFrequency counts the frequency of runes in multiple texts concurrently.
func ConcurrentFrequency(texts []string) FreqMap {
	m := FreqMap{}
	var wg sync.WaitGroup
	mu := sync.Mutex()

	// Worker function to process each text
	f := func(s string) {
		defer wg.Done()
		localFreq := Frequency(s)
		mu.Lock()
		for k, v := range localFreq {
			m[k] += v
		}
		mu.Unlock()
	}

	// Launch a goroutine for each text
	for _, text := range texts {
		wg.Add(1)
		go f(text)
	}

	// Wait for all goroutines to finish
	wg.Wait()
	return m
}