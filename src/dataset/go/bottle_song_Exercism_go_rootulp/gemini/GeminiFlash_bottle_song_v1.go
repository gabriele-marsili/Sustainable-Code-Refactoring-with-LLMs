package bottlesong

import (
	"fmt"
	"strings"
)

var numberToCardinal = map[int]string{
	10: "ten",
	9:  "nine",
	8:  "eight",
	7:  "seven",
	6:  "six",
	5:  "five",
	4:  "four",
	3:  "three",
	2:  "two",
	1:  "one",
	0:  "no",
}

func Recite(startBottles, takeDown int) []string {
	song := make([]string, 0, takeDown*5) // Pre-allocate memory for the song
	for i := startBottles; i > startBottles-takeDown; i-- {
		verseLines := verse(i)
		song = append(song, verseLines...)
		if i > startBottles-takeDown+1 { // Avoid appending "" to the last verse
			song = append(song, "")
		}
	}
	return song
}

func verse(bottles int) []string {
	startCardinal := cardinal(bottles)
	endCardinal := cardinal(bottles - 1)
	pluralStart := maybePluralize(bottles, "bottle", "bottles")
	pluralEnd := maybePluralize(bottles-1, "bottle", "bottles")
	startCap := capitalize(startCardinal)

	return []string{
		fmt.Sprintf("%s green %s hanging on the wall,", startCap, pluralStart),
		fmt.Sprintf("%s green %s hanging on the wall,", startCap, pluralStart),
		"And if one green bottle should accidentally fall,",
		fmt.Sprintf("There'll be %s green %s hanging on the wall.", endCardinal, pluralEnd),
	}
}

func cardinal(number int) string {
	return numberToCardinal[number]
}

func capitalize(str string) string {
	if len(str) == 0 {
		return ""
	}
	// Convert string to rune slice to handle UTF-8 characters correctly
	runes := []rune(str)
	runes[0] = []rune(strings.ToUpper(string(runes[0])))[0] // Capitalize the first rune
	return string(runes)
}

func maybePluralize(number int, singularWord string, pluralWord string) string {
	if number == 1 {
		return singularWord
	}
	return pluralWord
}