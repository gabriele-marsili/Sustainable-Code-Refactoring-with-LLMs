package phonenumber

import (
	"errors"
	"strings"
)

var (
	errNotPhoneNumber = errors.New("Not a phone number")
)

func Number(number string) (string, error) {
	var digits strings.Builder
	digits.Grow(11)
	
	for _, c := range number {
		if c >= '0' && c <= '9' {
			digits.WriteByte(byte(c))
		}
	}
	
	result := digits.String()
	length := len(result)
	
	switch {
	case length == 10:
		return result, nil
	case length == 11 && result[0] == '1':
		return result[1:], nil
	default:
		return "", errNotPhoneNumber
	}
}

func AreaCode(number string) (string, error) {
	digits, err := Number(number)
	if err != nil {
		return "", err
	}
	return digits[:3], nil
}

func Format(number string) (string, error) {
	digits, err := Number(number)
	if err != nil {
		return "", err
	}
	
	var result strings.Builder
	result.Grow(14)
	result.WriteByte('(')
	result.WriteString(digits[:3])
	result.WriteString(") ")
	result.WriteString(digits[3:6])
	result.WriteByte('-')
	result.WriteString(digits[6:10])
	
	return result.String(), nil
}