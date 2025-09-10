package romannumerals

import (
	"errors"
	"strings"
)

var romanValues = []struct {
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

func ToRomanNumeral(input int) (string, error) {
	if input <= 0 || input > 3000 {
		return "", errors.New("input must be greater than 0 and less than or equal to 3000")
	}

	var result strings.Builder
	for _, numeral := range romanValues {
		for input >= numeral.value {
			result.WriteString(numeral.symbol)
			input -= numeral.value
		}
	}

	return result.String(), nil
}