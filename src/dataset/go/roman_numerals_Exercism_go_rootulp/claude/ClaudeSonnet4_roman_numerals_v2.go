package romannumerals

import (
	"errors"
	"strings"
)

var (
	values = []int{1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1}
	numerals = []string{"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"}
)

func ToRomanNumeral(input int) (string, error) {
	if input <= 0 {
		return "", errors.New("input must be greater than 0")
	}
	if input > 3000 {
		return "", errors.New("input must be less than or equal to 3000")
	}

	var result strings.Builder
	result.Grow(16) // Pre-allocate capacity for typical roman numeral length
	
	for i, value := range values {
		count := input / value
		if count > 0 {
			for j := 0; j < count; j++ {
				result.WriteString(numerals[i])
			}
			input -= count * value
		}
	}
	
	return result.String(), nil
}