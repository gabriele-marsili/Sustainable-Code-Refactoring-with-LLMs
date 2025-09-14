package phonenumber

import (
	"errors"
	"strings"
)

var (
	errNotPhoneNumber = errors.New("Not a phone number")
)

func extractDigits(number string) string {
	var builder strings.Builder
	builder.Grow(11)
	
	for _, c := range number {
		if c >= '0' && c <= '9' {
			builder.WriteByte(byte(c))
		}
	}
	return builder.String()
}

func Number(number string) (string, error) {
	digits := extractDigits(number)
	
	switch len(digits) {
	case 10:
		return digits, nil
	case 11:
		if digits[0] == '1' {
			return digits[1:], nil
		}
		return "", errNotPhoneNumber
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