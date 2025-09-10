package phonenumber

import (
	"errors"
	"fmt"
	"strings"
	"unicode"
)

func AreaCode(phoneNumber string) (string, error) {
	return extractSegment(phoneNumber, 0, 3)
}

func ExchangeCode(phoneNumber string) (string, error) {
	return extractSegment(phoneNumber, 3, 6)
}

func SubscriberNumber(phoneNumber string) (string, error) {
	return extractSegment(phoneNumber, 6, 10)
}

func Number(phoneNumber string) (string, error) {
	number, err := clean(phoneNumber)
	if err != nil {
		return "", err
	}
	if number[0] == '0' || number[0] == '1' {
		return "", fmt.Errorf("area code %v cannot start with 0 or 1", number[:3])
	}
	if number[3] == '0' || number[3] == '1' {
		return "", fmt.Errorf("exchange code %v cannot start with 0 or 1", number[3:6])
	}
	return number, nil
}

func clean(phoneNumber string) (string, error) {
	var builder strings.Builder
	for _, character := range phoneNumber {
		if unicode.IsDigit(character) {
			builder.WriteRune(character)
		}
	}
	cleaned := builder.String()
	if len(cleaned) == 11 && cleaned[0] == '1' {
		cleaned = cleaned[1:]
	}
	if len(cleaned) != 10 {
		return "", fmt.Errorf("phone number %v must have 10 digits", cleaned)
	}
	return cleaned, nil
}

func Format(phoneNumber string) (string, error) {
	number, err := Number(phoneNumber)
	if err != nil {
		return "", err
	}
	return fmt.Sprintf("(%v) %v-%v", number[:3], number[3:6], number[6:]), nil
}

func extractSegment(phoneNumber string, start, end int) (string, error) {
	number, err := Number(phoneNumber)
	if err != nil {
		return "", err
	}
	return number[start:end], nil
}