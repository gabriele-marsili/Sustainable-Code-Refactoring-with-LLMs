package romannumerals

import (
	"fmt"
	"strings"
)

var (
	thousands = []string{"", "M", "MM", "MMM"}
	hundreds  = []string{"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"}
	tens      = []string{"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"}
	ones      = []string{"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"}
)

func ToRomanNumeral(input int) (string, error) {
	if input < 1 || input > 3000 {
		return "", fmt.Errorf("number must be between 1 and 3000")
	}

	return thousands[input/1000] + hundreds[input/100%10] + tens[input/10%10] + ones[input%10], nil
}

func convert_thousands(digit int) string {
	if digit >= 0 && digit <= 3 {
		return thousands[digit]
	}
	return "Invalid digit"
}

func convert_hundreds(digit int) string {
	if digit >= 0 && digit <= 9 {
		return hundreds[digit]
	}
	return "Invalid digit"
}

func convert_tens(digit int) string {
	if digit >= 0 && digit <= 9 {
		return tens[digit]
	}
	return "Invalid digit"
}

func convert_ones(digit int) string {
	if digit >= 0 && digit <= 9 {
		return ones[digit]
	}
	return "Invalid digit"
}