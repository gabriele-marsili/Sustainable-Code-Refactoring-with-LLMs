package letter

// FreqMap records the frequency of each rune in a given text.
type FreqMap map[rune]int

// Frequency counts the frequency of each rune in a given text and returns this
// data as a FreqMap.
func Frequency(s string) FreqMap {
	m := make(FreqMap, len(s)/4) // Pre-allocate with estimated capacity
	// Every time we encounter a rune, we increase frequency in the map by 1
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

	// Create a channel to receive the results of the goroutines
	c := make(chan FreqMap, len(texts))
	
	// For collecting results from Channel
	m := FreqMap{}

	// Invoke goroutine for each text
	for _, text := range texts {
		go func(s string) {
			c <- Frequency(s)
		}(text)
	}

	// Collect all results
	for i := 0; i < len(texts); i++ {
		result := <-c
		for k, v := range result {
			m[k] += v
		}
	}
	
	return m
}