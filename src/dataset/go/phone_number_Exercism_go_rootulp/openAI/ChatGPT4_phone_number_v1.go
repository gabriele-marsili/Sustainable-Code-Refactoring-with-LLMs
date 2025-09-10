package phonenumber

import (
	"errors"
	"fmt"
	"strings"
	"unicode"
)

func AreaCode(phoneNumber string) (string, error) {
	number, err := Number(phoneNumber)
	if err != nil {
		return "", err
	}
	return number[:3], nil
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
		return "", errors.New("phone number must have 10 digits")
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