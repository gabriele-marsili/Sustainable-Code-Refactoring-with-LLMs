package phonenumber

import (
	"fmt"
	"strings"
	"unicode"
)

func AreaCode(phoneNumber string) (string, error) {
	number, err := Number(phoneNumber)
	if err != nil {
		return "", err
	}
	return number[0:3], nil
}

func ExchangeCode(phoneNumber string) (string, error) {
	number, err := Number(phoneNumber)
	if err != nil {
		return "", err
	}
	return number[3:6], nil
}

func SubscriberNumber(phoneNumber string) (string, error) {
	number, err := Number(phoneNumber)
	if err != nil {
		return "", err
	}
	return number[6:], nil
}

func Number(phoneNumber string) (string, error) {
	number, err := clean(phoneNumber)
	if err != nil {
		return "", err
	}
	if number[0] < '2' {
		return "", fmt.Errorf("area code %s can not start with 0 or 1", number[0:3])
	}
	if number[3] < '2' {
		return "", fmt.Errorf("exchange code %s can not start with 0 or 1", number[3:6])
	}
	return number, nil
}

func clean(phoneNumber string) (string, error) {
	cleaned := make([]byte, 0, 11)
	for _, character := range phoneNumber {
		if unicode.IsDigit(character) {
			cleaned = append(cleaned, byte(character))
		}
	}
	if len(cleaned) == 11 && cleaned[0] == '1' {
		cleaned = cleaned[1:]
	}
	if len(cleaned) != 10 {
		return "", fmt.Errorf("phone number %s must have 10 digits", string(cleaned))
	}
	return string(cleaned), nil
}

func Format(phoneNumber string) (string, error) {
	number, err := Number(phoneNumber)
	if err != nil {
		return "", err
	}
	var result strings.Builder
	result.Grow(14)
	result.WriteByte('(')
	result.WriteString(number[0:3])
	result.WriteString(") ")
	result.WriteString(number[3:6])
	result.WriteByte('-')
	result.WriteString(number[6:])
	return result.String(), nil
}