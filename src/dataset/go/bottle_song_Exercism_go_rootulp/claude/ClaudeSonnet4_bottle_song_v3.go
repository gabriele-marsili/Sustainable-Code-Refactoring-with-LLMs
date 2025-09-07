package bottlesong

import (
	"strings"
)

var numberToCardinal = [11]string{
	"no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
}

var bottleWord = [2]string{"bottles", "bottle"}

func Recite(startBottles, takeDown int) []string {
	if takeDown == 0 {
		return []string{}
	}
	
	capacity := takeDown*4 + takeDown - 1
	song := make([]string, 0, capacity)
	
	for i := startBottles; i > startBottles-takeDown; i-- {
		song = appendVerse(song, i)
		if i > startBottles-takeDown+1 {
			song = append(song, "")
		}
	}
	return song
}

func appendVerse(song []string, bottles int) []string {
	startCardinal := capitalize(numberToCardinal[bottles])
	endCardinal := numberToCardinal[bottles-1]
	startBottleWord := bottleWord[min(bottles, 1)]
	endBottleWord := bottleWord[min(bottles-1, 1)]
	
	line1 := startCardinal + " green " + startBottleWord + " hanging on the wall,"
	line4 := "There'll be " + endCardinal + " green " + endBottleWord + " hanging on the wall."
	
	return append(song,
		line1,
		line1,
		"And if one green bottle should accidentally fall,",
		line4,
	)
}

func capitalize(str string) string {
	if len(str) == 0 {
		return str
	}
	return strings.ToUpper(str[:1]) + str[1:]
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}