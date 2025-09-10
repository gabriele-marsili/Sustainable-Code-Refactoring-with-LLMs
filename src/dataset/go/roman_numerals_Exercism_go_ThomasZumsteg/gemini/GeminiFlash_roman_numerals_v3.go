package romannumerals

import (
	"errors"
	"strings"
)

// TestVersion is the unit tests that will pass.
const TestVersion = 1

// romanToDec stores a mapping between roman numerals and decimal equivalents.
var romanToDec = []struct {
	decimal int
	roman   string
}{
	{1000, "M"}, {900, "CM"}, {500, "D"}, {400, "CD"},
	{100, "C"}, {90, "XC"}, {50, "L"}, {40, "XL"},
	{10, "X"}, {9, "IX"}, {5, "V"}, {4, "IV"},
	{1, "I"},
}

/*ToRomanNumeral converts a decimal number to roman numerals
only works for numbers between 0 and 4000.*/
func ToRomanNumeral(dec int) (string, error) {
	if dec <= 0 || dec >= 4000 {
		return "", errors.New("Decimal number must be in range 0-4000")
	}

	var roman strings.Builder
	for _, numeral := range romanToDec {
		for dec >= numeral.decimal {
			roman.WriteString(numeral.roman)
			dec -= numeral.decimal
		}
	}

	return roman.String(), nil
}

/*divMod calculates quotient and remainder*/
func divMod(numerator, divisor int) (int, int) {
	return numerator / divisor, numerator % divisor
}