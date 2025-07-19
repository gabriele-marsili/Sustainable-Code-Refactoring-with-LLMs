package letter

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
	freqMaps := make(chan FreqMap, len(texts))

	for _, text := range texts {
		go func(t string, c chan<- FreqMap) {
			c <- Frequency(t)
		}(text, freqMaps)
	}

	result := make(FreqMap)

	// Merge freqMaps into result
	for range texts {
		freqMap := <-freqMaps
		for r, count := range freqMap {
			result[r] += count
		}
	}

	return result
}
