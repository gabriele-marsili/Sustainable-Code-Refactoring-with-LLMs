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
	songLength := takeDown * 5 // 4 lines per verse + 1 empty line
	song := make([]string, 0, songLength)

	for i := startBottles; i > startBottles-takeDown; i-- {
		verseLines := verse(i)
		song = append(song, verseLines...)
		song = append(song, "")
	}
	return song[:len(song)-1] // trim the last ""
}

func verse(bottles int) []string {
	startCardinal := cardinal(bottles)
	endCardinal := cardinal(bottles - 1)
	startBottlesStr := maybePluralize(bottles, "bottle", "bottles")
	endBottlesStr := maybePluralize(bottles-1, "bottle", "bottles")
	start := capitalize(startCardinal)

	return []string{
		fmt.Sprintf("%s green %s hanging on the wall,", start, startBottlesStr),
		fmt.Sprintf("%s green %s hanging on the wall,", start, startBottlesStr),
		"And if one green bottle should accidentally fall,",
		fmt.Sprintf("There'll be %s green %s hanging on the wall.", endCardinal, endBottlesStr),
	}
}

func cardinal(number int) string {
	return numberToCardinal[number]
}

// capitalize capitalizes the first letter of a given string
func capitalize(str string) string {
	if str == "" {
		return ""
	}
	b := []byte(str)
	b[0] = b[0] & 223 // equivalent to strings.ToUpper(string(str[0])) but faster
	return string(b)
}

// maybePluralize returns the plural version of word if number is > 1. Returns
// the singular version of word if number == 1.
func maybePluralize(number int, singularWord string, pluralWord string) string {
	if number == 1 {
		return singularWord
	}
	return pluralWord
}