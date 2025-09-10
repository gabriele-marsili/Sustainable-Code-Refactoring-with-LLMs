package phonenumber

import (
	"errors"
	"fmt"
	"strings"
)

/*Number extracts the digits of a phone number from surrounding text.*/
func Number(number string) (string, error) {
	var sb strings.Builder
	for _, c := range number {
		if c >= '0' && c <= '9' {
			sb.WriteRune(c)
		}
	}
	digits := sb.String()
	if len(digits) == 10 {
		return digits, nil
	}
	if len(digits) == 11 && digits[0] == '1' {
		return digits[1:], nil
	}
	return "", errors.New("Not a phone number: " + number)
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
	return fmt.Sprintf("(%s) %s-%s", digits[:3], digits[3:6], digits[6:10]), nil
}