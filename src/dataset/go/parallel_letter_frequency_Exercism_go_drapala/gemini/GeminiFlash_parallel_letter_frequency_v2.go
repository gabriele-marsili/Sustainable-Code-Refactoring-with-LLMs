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

// ConcurrentFrequency counts the frequency of each rune in the given texts concurrently and returns this
// data as a FreqMap.
func ConcurrentFrequency(texts []string) FreqMap {
	numTexts := len(texts)
	resultChan := make(chan FreqMap, numTexts)
	finalFrequencies := make(FreqMap)

	// Launch a goroutine for each text
	for _, text := range texts {
		go func(text string) {
			resultChan <- Frequency(text)
		}(text)
	}

	// Collect the results from the goroutines
	for i := 0; i < numTexts; i++ {
		frequencies := <-resultChan
		for char, count := range frequencies {
			finalFrequencies[char] += count
		}
	}

	return finalFrequencies
}