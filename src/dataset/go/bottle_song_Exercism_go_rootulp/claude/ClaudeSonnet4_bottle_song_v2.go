package bottlesong

import (
	"strings"
)

var numberToCardinal = [11]string{
	"no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
}

var capitalizedNumbers = [11]string{
	"No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
}

func Recite(startBottles, takeDown int) []string {
	capacity := takeDown * 5 // 4 lines per verse + 1 empty line, minus final empty
	if takeDown > 0 {
		capacity--
	}
	song := make([]string, 0, capacity)
	
	for i := startBottles; i > startBottles-takeDown; i-- {
		song = append(song, verse(i)...)
		if i > startBottles-takeDown+1 {
			song = append(song, "")
		}
	}
	return song
}

func verse(bottles int) []string {
	startCardinal := capitalizedNumbers[bottles]
	endCardinal := numberToCardinal[bottles-1]
	
	bottleWord := "bottles"
	if bottles == 1 {
		bottleWord = "bottle"
	}
	
	endBottleWord := "bottles"
	if bottles-1 == 1 {
		endBottleWord = "bottle"
	}

	line1 := startCardinal + " green " + bottleWord + " hanging on the wall,"
	line4 := "There'll be " + endCardinal + " green " + endBottleWord + " hanging on the wall."

	return []string{
		line1,
		line1,
		"And if one green bottle should accidentally fall,",
		line4,
	}
}