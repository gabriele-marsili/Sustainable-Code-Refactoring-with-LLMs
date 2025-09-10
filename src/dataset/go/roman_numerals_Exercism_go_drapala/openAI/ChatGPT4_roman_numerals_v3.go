package romannumerals

import "fmt"

var romanMapping = map[string][]string{
	"thousands": {"", "M", "MM", "MMM"},
	"hundreds":  {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"},
	"tens":      {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"},
	"ones":      {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"},
}

func convert_thousands(digit int) string {
	if digit >= 0 && digit < len(romanMapping["thousands"]) {
		return romanMapping["thousands"][digit]
	}
	return "Invalid digit"
}

func convert_hundreds(digit int) string {
	if digit >= 0 && digit < len(romanMapping["hundreds"]) {
		return romanMapping["hundreds"][digit]
	}
	return "Invalid digit"
}

func convert_tens(digit int) string {
	if digit >= 0 && digit < len(romanMapping["tens"]) {
		return romanMapping["tens"][digit]
	}
	return "Invalid digit"
}

func convert_ones(digit int) string {
	if digit >= 0 && digit < len(romanMapping["ones"]) {
		return romanMapping["ones"][digit]
	}
	return "Invalid digit"
}

func ToRomanNumeral(input int) (string, error) {
	if input < 1 || input > 3000 {
		return "", fmt.Errorf("number must be between 1 and 3000")
	}

	thousands := input / 1000
	hundreds := (input / 100) % 10
	tens := (input / 10) % 10
	ones := input % 10

	return romanMapping["thousands"][thousands] +
		romanMapping["hundreds"][hundreds] +
		romanMapping["tens"][tens] +
		romanMapping["ones"][ones], nil
}