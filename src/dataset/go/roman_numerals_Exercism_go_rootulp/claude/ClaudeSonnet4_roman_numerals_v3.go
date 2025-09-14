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

func ToRomanNumeral(input int) (output string, err error) {
	if input <= 0 {
		return "", errors.New("input must be greater than 0")
	}
	if input > 3000 {
		return "", errors.New("input must be less than or equal to 3000")
	}

	var result strings.Builder
	result.Grow(16)

	for _, rv := range romanValues {
		count := input / rv.value
		if count > 0 {
			for i := 0; i < count; i++ {
				result.WriteString(rv.symbol)
			}
			input -= count * rv.value
		}
	}

	return result.String(), nil
}

func convertToNumeral(number int) string {
	var result strings.Builder
	result.Grow(8)

	for _, rv := range romanValues {
		count := number / rv.value
		if count > 0 {
			for i := 0; i < count; i++ {
				result.WriteString(rv.symbol)
			}
			number -= count * rv.value
		}
	}

	return result.String()
}

func divmod(numerator int, denominator int) (quotient, remainder int) {
	quotient = numerator / denominator
	remainder = numerator % denominator
	return quotient, remainder
}