package romannumerals

import (
	"errors"
	"strings"
)

const TestVersion = 1

var romanToDec = [13]struct {
	decimal int
	roman   string
}{
	{1000, "M"}, {900, "CM"}, {500, "D"}, {400, "CD"},
	{100, "C"}, {90, "XC"}, {50, "L"}, {40, "XL"},
	{10, "X"}, {9, "IX"}, {5, "V"}, {4, "IV"}, {1, "I"},
}

func ToRomanNumeral(dec int) (string, error) {
	if dec <= 0 || dec >= 4000 {
		return "", errors.New("Decimal number must be in range 0-4000")
	}
	
	var result strings.Builder
	result.Grow(16)
	
	for i := 0; i < len(romanToDec); i++ {
		count := dec / romanToDec[i].decimal
		if count > 0 {
			result.WriteString(strings.Repeat(romanToDec[i].roman, count))
			dec -= count * romanToDec[i].decimal
		}
	}
	
	return result.String(), nil
}

func divMod(numerator, divisor int) (int, int) {
	return numerator / divisor, numerator % divisor
}