package bottlesong

import (
	"fmt"
)

var numberToCardinal = []string{
	"no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
}

func Recite(startBottles, takeDown int) []string {
	song := make([]string, 0, takeDown*5-1) // Preallocate slice with exact size
	for i := startBottles; i > startBottles-takeDown; i-- {
		song = append(song, verse(i)...)
	}
	return song
}

func verse(bottles int) []string {
	startCardinal := numberToCardinal[bottles]
	endCardinal := numberToCardinal[max(0, bottles-1)]

	return []string{
		fmt.Sprintf("%s green %s hanging on the wall,", capitalize(startCardinal), maybePluralize(bottles, "bottle", "bottles")),
		fmt.Sprintf("%s green %s hanging on the wall,", capitalize(startCardinal), maybePluralize(bottles, "bottle", "bottles")),
		"And if one green bottle should accidentally fall,",
		fmt.Sprintf("There'll be %s green %s hanging on the wall.", endCardinal, maybePluralize(bottles-1, "bottle", "bottles")),
		"",
	}
}

func capitalize(str string) string {
	return string(str[0]-32) + str[1:] // Inline capitalization without extra function calls
}

func maybePluralize(number int, singularWord, pluralWord string) string {
	if number == 1 {
		return singularWord
	}
	return pluralWord
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}