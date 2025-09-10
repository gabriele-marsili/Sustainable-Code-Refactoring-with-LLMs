package romannumerals

import "fmt"

var romanMappings = map[int][]string{
	1000: {"", "M", "MM", "MMM"},
	100:  {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"},
	10:   {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"},
	1:    {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"},
}

func ToRomanNumeral(input int) (string, error) {
	if input < 1 || input > 3000 {
		return "", fmt.Errorf("number must be between 1 and 3000")
	}

	return romanMappings[1000][input/1000] +
		romanMappings[100][(input/100)%10] +
		romanMappings[10][(input/10)%10] +
		romanMappings[1][input%10], nil
}