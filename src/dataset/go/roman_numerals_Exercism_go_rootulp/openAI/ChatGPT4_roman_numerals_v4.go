package romannumerals

import (
	"errors"
)

func ToRomanNumeral(input int) (string, error) {
	if input <= 0 {
		return "", errors.New("input must be greater than 0")
	} else if input > 3000 {
		return "", errors.New("input must be less than or equal to 3000")
	}

	var output string
	values := []int{1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1}
	symbols := []string{"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"}

	for i, value := range values {
		for input >= value {
			output += symbols[i]
			input -= value
		}
	}
	return output, nil
}