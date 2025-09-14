package etl

import "strings"

func Transform(in map[int][]string) (result map[string]int) {
	totalLetters := 0
	for _, letters := range in {
		totalLetters += len(letters)
	}
	
	result = make(map[string]int, totalLetters)
	
	for score, letters := range in {
		for _, letter := range letters {
			result[strings.ToLower(letter)] = score
		}
	}
	return result
}