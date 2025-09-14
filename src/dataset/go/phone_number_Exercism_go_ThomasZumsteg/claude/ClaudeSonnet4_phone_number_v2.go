package phonenumber

import (
	"errors"
	"strings"
)

/*Number extracts the digits of a phone number from surrounding text.*/
func Number(number string) (string, error) {
	var digits strings.Builder
	digits.Grow(11) // Pre-allocate capacity for maximum expected digits
	
	for _, c := range number {
		if '0' <= c && c <= '9' {
			digits.WriteByte(byte(c))
		}
	}
	
	digitStr := digits.String()
	digitLen := len(digitStr)
	
	switch {
	case digitLen == 10:
		return digitStr, nil
	case digitLen == 11 && digitStr[0] == '1':
		return digitStr[1:], nil
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
	
	var result strings.Builder
	result.Grow(14) // Pre-allocate for "(xxx) xxx-xxxx"
	result.WriteByte('(')
	result.WriteString(digits[:3])
	result.WriteString(") ")
	result.WriteString(digits[3:6])
	result.WriteByte('-')
	result.WriteString(digits[6:10])
	
	return result.String(), nil
}