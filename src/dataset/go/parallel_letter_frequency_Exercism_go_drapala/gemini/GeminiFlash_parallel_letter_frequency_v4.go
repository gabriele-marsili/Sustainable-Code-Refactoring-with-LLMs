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
	c := make(chan FreqMap, len(texts)) // Buffered channel
	var wg sync.WaitGroup
	m := FreqMap{}
	var mu sync.Mutex

	f := func(s string) {
		defer wg.Done()
		freqMap := Frequency(s)
		mu.Lock()
		for k, v := range freqMap {
			m[k] += v
		}
		mu.Unlock()
		c <- freqMap // Send to channel after aggregation
	}

	for _, text := range texts {
		wg.Add(1)
		go f(text)
	}

	wg.Wait()
	close(c) // Close the channel after all goroutines are done

	// Drain the channel (optional, but good practice)
	for range c {
		// No-op: we've already aggregated in the goroutine
	}

	return m
}