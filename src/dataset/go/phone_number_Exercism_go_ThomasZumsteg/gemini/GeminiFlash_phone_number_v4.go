package phonenumber

import (
	"errors"
	"fmt"
	"strings"
)

/*Number extracts the digits of a phone number from surrounding text.*/
func Number(number string) (string, error) {
	var digits strings.Builder
	digits.Grow(len(number)) // Pre-allocate memory

	for i := 0; i < len(number); i++ {
		c := number[i]
		if '0' <= c && c <= '9' {
			digits.WriteByte(c)
		}
	}

	num := digits.String()
	switch len(num) {
	case 10:
		return num, nil
	case 11:
		if num[0] == '1' {
			return num[1:], nil
		}
		fallthrough // Consider it an invalid number
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
	if len(digits) < 3 {
		return "", errors.New("Invalid phone number: " + number) // Handle short numbers
	}
	return digits[:3], nil
}

/*Format extracts a phone number from surrounding text and formats it.*/
func Format(number string) (string, error) {
	digits, err := Number(number)
	if err != nil {
		return "", err
	}
	if len(digits) != 10 {
		return "", errors.New("Invalid phone number: " + number) // Handle numbers that are not exactly 10 digits after extraction
	}
	return fmt.Sprintf("(%s) %s-%s", digits[:3], digits[3:6], digits[6:]), nil
}