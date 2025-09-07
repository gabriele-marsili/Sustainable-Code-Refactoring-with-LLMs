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
	if takeDown == 0 {
		return []string{}
	}
	
	capacity := takeDown * 4
	if takeDown > 1 {
		capacity += takeDown - 1
	}
	
	song := make([]string, 0, capacity)
	
	for i := startBottles; i > startBottles-takeDown; i-- {
		startCardinal := capitalizedNumbers[i]
		endCardinal := numberToCardinal[i-1]
		
		bottles := "bottles"
		if i == 1 {
			bottles = "bottle"
		}
		
		endBottles := "bottles"
		if i-1 == 1 {
			endBottles = "bottle"
		}
		
		line1 := startCardinal + " green " + bottles + " hanging on the wall,"
		line4 := "There'll be " + endCardinal + " green " + endBottles + " hanging on the wall."
		
		song = append(song, line1, line1, "And if one green bottle should accidentally fall,", line4)
		
		if i > startBottles-takeDown+1 {
			song = append(song, "")
		}
	}
	
	return song
}

func verse(bottles int) []string {
	startCardinal := capitalizedNumbers[bottles]
	endCardinal := numberToCardinal[bottles-1]
	
	bottlesWord := "bottles"
	if bottles == 1 {
		bottlesWord = "bottle"
	}
	
	endBottlesWord := "bottles"
	if bottles-1 == 1 {
		endBottlesWord = "bottle"
	}
	
	line1 := startCardinal + " green " + bottlesWord + " hanging on the wall,"
	
	return []string{
		line1,
		line1,
		"And if one green bottle should accidentally fall,",
		"There'll be " + endCardinal + " green " + endBottlesWord + " hanging on the wall.",
	}
}

func cardinal(number int) string {
	return numberToCardinal[number]
}

func capitalize(str string) string {
	if str == "" {
		return ""
	}
	return strings.ToUpper(string(str[0])) + str[1:]
}

func maybePluralize(number int, singularWord string, pluralWord string) string {
	if number == 1 {
		return singularWord
	}
	return pluralWord
}