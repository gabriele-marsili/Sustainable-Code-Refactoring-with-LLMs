package romannumerals

import (
	"errors"
)

func ToRomanNumeral(input int) (output string, err error) {
	if input <= 0 {
		return "", errors.New("input must be greater than 0")
	} else if input > 3000 {
		return "", errors.New("input must be less than or equal to 3000")
	}

	var romanPairs = []struct {
		Value  int
		Symbol string
	}{
		{1000, "M"}, {900, "CM"}, {500, "D"}, {400, "CD"},
		{100, "C"}, {90, "XC"}, {50, "L"}, {40, "XL"},
		{10, "X"}, {9, "IX"}, {5, "V"}, {4, "IV"}, {1, "I"},
	}

	for _, pair := range romanPairs {
		for input >= pair.Value {
			output += pair.Symbol
			input -= pair.Value
		}
	}
	return output, nil
}