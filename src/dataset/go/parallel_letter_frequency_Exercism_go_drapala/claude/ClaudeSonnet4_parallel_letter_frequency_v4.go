package letter

import (
	"sync"
)

type FreqMap map[rune]int

func Frequency(s string) FreqMap {
	m := make(FreqMap, 64)
	for _, r := range s {
		m[r]++
	}
	return m
}

func ConcurrentFrequency(texts []string) FreqMap {
	if len(texts) == 0 {
		return FreqMap{}
	}
	
	if len(texts) == 1 {
		return Frequency(texts[0])
	}

	results := make(chan FreqMap, len(texts))
	var wg sync.WaitGroup
	
	for _, text := range texts {
		wg.Add(1)
		go func(s string) {
			defer wg.Done()
			results <- Frequency(s)
		}(text)
	}
	
	go func() {
		wg.Wait()
		close(results)
	}()
	
	m := make(FreqMap, 128)
	for freq := range results {
		for k, v := range freq {
			m[k] += v
		}
	}
	
	return m
}