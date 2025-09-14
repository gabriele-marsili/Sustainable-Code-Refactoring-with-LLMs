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
		return "", fmt.Errorf("area code %s can not start with 0 or 1", number[:3])
	}
	if number[3] == '0' || number[3] == '1' {
		return "", fmt.Errorf("exchange code %s can not start with 0 or 1", number[3:6])
	}
	return number, nil
}

func clean(phoneNumber string) (string, error) {
	var cleaned strings.Builder
	cleaned.Grow(11)
	
	for _, character := range phoneNumber {
		if unicode.IsDigit(character) {
			cleaned.WriteRune(character)
		}
	}
	
	result := cleaned.String()
	if len(result) == 11 && result[0] == '1' {
		result = result[1:]
	}
	if len(result) != 10 {
		return "", fmt.Errorf("phone number %s must have 10 digits", result)
	}
	return result, nil
}

func Format(phoneNumber string) (string, error) {
	number, err := Number(phoneNumber)
	if err != nil {
		return "", err
	}
	return fmt.Sprintf("(%s) %s-%s", number[:3], number[3:6], number[6:]), nil
}