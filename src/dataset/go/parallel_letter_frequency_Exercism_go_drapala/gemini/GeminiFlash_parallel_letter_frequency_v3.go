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

// ConcurrentFrequency counts the frequency of each rune in the given texts concurrently.
func ConcurrentFrequency(texts []string) FreqMap {
	numTexts := len(texts)
	resultChan := make(chan FreqMap, numTexts)
	finalResult := make(FreqMap)

	// Launch a goroutine for each text.
	for _, text := range texts {
		go func(txt string) {
			resultChan <- Frequency(txt)
		}(text)
	}

	// Collect results from the channel.
	for i := 0; i < numTexts; i++ {
		freqMap := <-resultChan
		for char, count := range freqMap {
			finalResult[char] += count
		}
	}

	return finalResult
}