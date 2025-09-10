package phonenumber

import (
	"fmt"
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
	cleaned, err := clean(phoneNumber)
	if err != nil {
		return "", err
	}

	if cleaned[0] == '0' || cleaned[0] == '1' {
		return "", fmt.Errorf("area code %v can not start with 0 or 1", cleaned[:3])
	}
	if cleaned[3] == '0' || cleaned[3] == '1' {
		return "", fmt.Errorf("exchange code %v can not start with 0 or 1", cleaned[3:6])
	}

	return cleaned, nil
}

func clean(phoneNumber string) (string, error) {
	cleaned := make([]rune, 0, len(phoneNumber))
	for _, character := range phoneNumber {
		if unicode.IsDigit(character) {
			cleaned = append(cleaned, character)
		}
	}

	if len(cleaned) == 11 && cleaned[0] == '1' {
		cleaned = cleaned[1:]
	}

	if len(cleaned) != 10 {
		return "", fmt.Errorf("phone number %v must have 10 digits", string(cleaned))
	}

	return string(cleaned), nil
}

func Format(phoneNumber string) (string, error) {
	number, err := Number(phoneNumber)
	if err != nil {
		return "", err
	}
	return fmt.Sprintf("(%s) %s-%s", number[:3], number[3:6], number[6:]), nil
}