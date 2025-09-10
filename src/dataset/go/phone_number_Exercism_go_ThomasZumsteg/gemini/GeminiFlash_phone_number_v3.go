package phonenumber

import (
	"errors"
	"fmt"
	"strings"
)

/*Number extracts the digits of a phone number from surrounding text.*/
func Number(number string) (string, error) {
	var digits strings.Builder
	digits.Grow(len(number))
	for _, c := range number {
		if '0' <= c && c <= '9' {
			digits.WriteRune(c)
		}
	}
	d := digits.String()
	switch len(d) {
	case 10:
		return d, nil
	case 11:
		if d[0] == '1' {
			return d[1:], nil
		}
		fallthrough
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
		return "", errors.New("invalid phone number")
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
		return "", errors.New("invalid phone number")
	}
	return fmt.Sprintf("(%s) %s-%s", digits[:3], digits[3:6], digits[6:10]), nil
}