package bottlesong

import (
	"fmt"
)

var numberToCardinal = [...]string{
	"no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
}

func Recite(startBottles, takeDown int) (song []string) {
	song = make([]string, 0, takeDown*5-1) // Preallocate slice with estimated size
	for i := startBottles; i > startBottles-takeDown; i-- {
		song = append(song, verse(i)...)
	}
	return song
}

func verse(bottles int) []string {
	startCardinal := numberToCardinal[bottles]
	endCardinal := numberToCardinal[max(0, bottles-1)]

	pluralStart := maybePluralize(bottles, "bottle", "bottles")
	pluralEnd := maybePluralize(bottles-1, "bottle", "bottles")

	return []string{
		fmt.Sprintf("%s green %s hanging on the wall,", capitalize(startCardinal), pluralStart),
		fmt.Sprintf("%s green %s hanging on the wall,", capitalize(startCardinal), pluralStart),
		"And if one green bottle should accidentally fall,",
		fmt.Sprintf("There'll be %s green %s hanging on the wall.", endCardinal, pluralEnd),
		"",
	}
}

// capitalize capitalizes the first letter of a given string
func capitalize(str string) string {
	if str == "" {
		return ""
	}
	return string(str[0]-32) + str[1:] // Avoid strings.ToUpper for single character
}

// maybePluralize returns the plural version of word if number is > 1. Returns
// the singular version of word if number == 1.
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