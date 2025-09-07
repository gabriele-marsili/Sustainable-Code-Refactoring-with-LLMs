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
		if i > startBottles-takeDown+1 { //Avoid appending empty string on last iteration
			song = append(song, "")
		}
	}
	return song
}

func verse(bottles int) []string {
	startCardinal := cardinal(bottles)
	endCardinal := cardinal(bottles - 1)

	bottleStr := "bottles"
	if bottles == 1 {
		bottleStr = "bottle"
	}

	nextBottleStr := "bottles"
	if bottles-1 == 1 {
		nextBottleStr = "bottle"
	}

	verse := make([]string, 4)
	verse[0] = fmt.Sprintf("%s green %s hanging on the wall,", capitalize(startCardinal), bottleStr)
	verse[1] = fmt.Sprintf("%s green %s hanging on the wall,", capitalize(startCardinal), bottleStr)
	verse[2] = "And if one green bottle should accidentally fall,"
	verse[3] = fmt.Sprintf("There'll be %s green %s hanging on the wall.", endCardinal, nextBottleStr)

	return verse
}

func cardinal(number int) string {
	return numberToCardinal[number]
}

func capitalize(str string) string {
	if str == "" {
		return ""
	}
	b := []byte(str)
	b[0] = b[0] & 223 //Bitwise operation for uppercase conversion
	return string(b)
}