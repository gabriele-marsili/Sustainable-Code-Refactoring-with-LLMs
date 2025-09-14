package letter

import (
	"runtime"
	"sync"
)

// FreqMap records the frequency of each rune in a given text.
type FreqMap map[rune]int

// Frequency counts the frequency of each rune in a given text and returns this
// data as a FreqMap.
func Frequency(s string) FreqMap {
	if len(s) == 0 {
		return FreqMap{}
	}
	
	m := make(FreqMap, len(s)/4)
	for _, r := range s {
		m[r]++
	}
	return m
}

// ConcurrentFrequency counts the frequency of each rune in texts (concurrently)
// and returns a FreqMap.
func ConcurrentFrequency(texts []string) FreqMap {
	if len(texts) == 0 {
		return FreqMap{}
	}
	
	if len(texts) == 1 {
		return Frequency(texts[0])
	}
	
	numWorkers := runtime.NumCPU()
	if numWorkers > len(texts) {
		numWorkers = len(texts)
	}
	
	textChan := make(chan string, numWorkers)
	resultChan := make(chan FreqMap, numWorkers)
	
	var wg sync.WaitGroup
	
	for i := 0; i < numWorkers; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			localResult := make(FreqMap)
			for text := range textChan {
				freqMap := Frequency(text)
				for r, count := range freqMap {
					localResult[r] += count
				}
			}
			resultChan <- localResult
		}()
	}
	
	go func() {
		for _, text := range texts {
			textChan <- text
		}
		close(textChan)
	}()
	
	go func() {
		wg.Wait()
		close(resultChan)
	}()
	
	result := make(FreqMap)
	for partialResult := range resultChan {
		for r, count := range partialResult {
			result[r] += count
		}
	}
	
	return result
}