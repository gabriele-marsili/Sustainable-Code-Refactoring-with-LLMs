package bottlesong

import (
	"strings"
)

var numberToCardinal = [11]string{
	"no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
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
		song = append(song, verse(i)...)
		if i > startBottles-takeDown+1 {
			song = append(song, "")
		}
	}
	return song
}

func verse(bottles int) []string {
	startCardinal := cardinal(bottles)
	endCardinal := cardinal(bottles - 1)
	
	startBottleWord := "bottles"
	if bottles == 1 {
		startBottleWord = "bottle"
	}
	
	endBottleWord := "bottles"
	if bottles-1 == 1 {
		endBottleWord = "bottle"
	}
	
	capitalizedStart := capitalize(startCardinal)
	
	line1 := capitalizedStart + " green " + startBottleWord + " hanging on the wall,"
	line4 := "There'll be " + endCardinal + " green " + endBottleWord + " hanging on the wall."
	
	return []string{
		line1,
		line1,
		"And if one green bottle should accidentally fall,",
		line4,
	}
}

func cardinal(number int) string {
	return numberToCardinal[number]
}

func capitalize(str string) string {
	if str == "" {
		return ""
	}
	return strings.ToUpper(str[:1]) + str[1:]
}

func maybePluralize(number int, singularWord string, pluralWord string) string {
	if number == 1 {
		return singularWord
	}
	return pluralWord
}