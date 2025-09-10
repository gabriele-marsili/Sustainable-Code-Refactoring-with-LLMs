package romannumerals

import (
	"errors"
)

// TestVersion is the unit tests that will pass.
const TestVersion = 1

// romanToDec stores a mapping between roman numerals and decimal equivalents.
var romanToDec = [...]struct {
	decimal int
	roman   string
}{
	{1000, "M"}, {900, "CM"}, {500, "D"}, {400, "CD"},
	{100, "C"}, {90, "XC"}, {50, "L"}, {40, "XL"},
	{10, "X"}, {9, "IX"}, {5, "V"}, {4, "IV"}, {1, "I"},
}

// ToRomanNumeral converts a decimal number to roman numerals.
// Only works for numbers between 1 and 3999.
func ToRomanNumeral(dec int) (string, error) {
	if dec <= 0 || dec >= 4000 {
		return "", errors.New("decimal number must be in range 1-3999")
	}
	var romanBuilder []byte
	for _, entry := range romanToDec {
		for dec >= entry.decimal {
			romanBuilder = append(romanBuilder, entry.roman...)
			dec -= entry.decimal
		}
	}
	return string(romanBuilder), nil
}