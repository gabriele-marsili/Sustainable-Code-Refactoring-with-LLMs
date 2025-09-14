package romannumerals

import (
	"errors"
)

var romanNumerals = []struct {
	value  int
	symbol string
}{
	{1000, "M"},
	{900, "CM"},
	{500, "D"},
	{400, "CD"},
	{100, "C"},
	{90, "XC"},
	{50, "L"},
	{40, "XL"},
	{10, "X"},
	{9, "IX"},
	{5, "V"},
	{4, "IV"},
	{1, "I"},
}

func ToRomanNumeral(input int) (output string, err error) {
	if input <= 0 {
		return "", errors.New("input must be greater than 0")
	}
	if input > 3000 {
		return "", errors.New("input must be less than or equal to 3000")
	}

	for _, numeral := range romanNumerals {
		for input >= numeral.value {
			output += numeral.symbol
			input -= numeral.value
		}
	}
	return output, nil
}

func convertToNumeral(number int) string {
	numberToNumeral := map[int]string{
		1:    "I",
		2:    "II",
		3:    "III",
		4:    "IV",
		5:    "V",
		6:    "VI",
		7:    "VII",
		8:    "VIII",
		9:    "IX",
		10:   "X",
		20:   "XX",
		30:   "XXX",
		40:   "XL",
		50:   "L",
		60:   "LX",
		70:   "LXX",
		80:   "LXXX",
		90:   "XC",
		100:  "C",
		200:  "CC",
		300:  "CCC",
		400:  "CD",
		500:  "D",
		600:  "DC",
		700:  "DCC",
		800:  "DCCC",
		900:  "CM",
		1000: "M",
		2000: "MM",
		3000: "MMM",
	}
	return numberToNumeral[number]
}

func divmod(numerator int, denominator int) (quotient, remainder int) {
	quotient = numerator / denominator
	remainder = numerator % denominator
	return quotient, remainder
}