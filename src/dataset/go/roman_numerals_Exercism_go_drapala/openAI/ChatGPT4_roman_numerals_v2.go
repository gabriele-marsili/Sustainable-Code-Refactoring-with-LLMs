package romannumerals

import "fmt"

var romanMappings = [][]string{
	{"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"},
	{"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"},
	{"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"},
	{"", "M", "MM", "MMM"},
}

func ToRomanNumeral(input int) (string, error) {
	if input < 1 || input > 3000 {
		return "", fmt.Errorf("number must be between 1 and 3000")
	}

	thousands := romanMappings[3][input/1000]
	hundreds := romanMappings[2][(input/100)%10]
	tens := romanMappings[1][(input/10)%10]
	ones := romanMappings[0][input%10]

	return thousands + hundreds + tens + ones, nil
}