package bottlesong

import (
	"fmt"
	"strings"
)

var numberToCardinal = [...]string{"no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"}

func Recite(startBottles, takeDown int) (song []string) {
	song = make([]string, 0, takeDown*5-1)
	for i := startBottles; i > startBottles-takeDown; i-- {
		song = append(song, verse(i)...)
	}
	return song
}

func verse(bottles int) []string {
	startCardinal := cardinal(bottles)
	endCardinal := cardinal(bottles - 1)
	bottleWord := maybePluralize(bottles, "bottle", "bottles")
	nextBottleWord := maybePluralize(bottles-1, "bottle", "bottles")

	return []string{
		fmt.Sprintf("%v green %v hanging on the wall,", capitalize(startCardinal), bottleWord),
		fmt.Sprintf("%v green %v hanging on the wall,", capitalize(startCardinal), bottleWord),
		"And if one green bottle should accidentally fall,",
		fmt.Sprintf("There'll be %v green %v hanging on the wall.", endCardinal, nextBottleWord),
		"",
	}
}

func cardinal(number int) string {
	if number >= 0 && number <= 10 {
		return numberToCardinal[number]
	}
	return ""
}

func capitalize(str string) string {
	if str == "" {
		return ""
	}
	return strings.ToUpper(str[:1]) + str[1:]
}

func maybePluralize(number int, singularWord, pluralWord string) string {
	if number == 1 {
		return singularWord
	}
	return pluralWord
}