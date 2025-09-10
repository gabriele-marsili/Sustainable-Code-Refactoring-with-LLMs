package letter

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
	freqMaps := make(chan FreqMap, numTexts)
	result := make(FreqMap)

	var worker = func(text string, c chan<- FreqMap) {
		c <- Frequency(text)
	}

	for _, text := range texts {
		go worker(text, freqMaps)
	}

	for i := 0; i < numTexts; i++ {
		freqMap := <-freqMaps
		for r, count := range freqMap {
			result[r] += count
		}
	}

	return result
}