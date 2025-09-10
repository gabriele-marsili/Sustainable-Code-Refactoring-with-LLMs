package phonenumber

import (
	"errors"
	"fmt"
	"strings"
)

/*Number extracts the digits of a phone number from surrounding text.*/
func Number(number string) (string, error) {
	var digits strings.Builder
	digits.Grow(11) // Pre-allocate memory to avoid reallocations

	for _, c := range number {
		if '0' <= c && c <= '9' {
			digits.WriteRune(c)
		}
	}

	numStr := digits.String()
	switch len(numStr) {
	case 10:
		return numStr, nil
	case 11:
		if numStr[0] == '1' {
			return numStr[1:], nil
		}
		fallthrough // Consider it an invalid number if the first digit is not '1'
	default:
		return "", errors.New("Not a phone number: " + number)
	}
}

/*AreaCode extracts the area code from surrounding text*/
func AreaCode(number string) (string, error) {
	digits, err := Number(number)
	if err != nil {
		return "", err
	}
	return digits[:3], nil
}

/*Format extracts a phone number from surrounding text and formats it.*/
func Format(number string) (string, error) {
	digits, err := Number(number)
	if err != nil {
		return "", err
	}
	return fmt.Sprintf("(%s) %s-%s", digits[:3], digits[3:6], digits[6:]), nil
}