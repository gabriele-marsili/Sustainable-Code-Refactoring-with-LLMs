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
	cleaned, err := clean(phoneNumber)
	if err != nil {
		return "", err
	}

	if len(cleaned) != 10 {
		return "", fmt.Errorf("phone number %v must have 10 digits", cleaned)
	}

	areaCode := cleaned[:3]
	if areaCode[0] == '0' || areaCode[0] == '1' {
		return "", fmt.Errorf("area code %v can not start with 0 or 1", areaCode)
	}

	exchangeCode := cleaned[3:6]
	if exchangeCode[0] == '0' || exchangeCode[0] == '1' {
		return "", fmt.Errorf("exchange code %v can not start with 0 or 1", exchangeCode)
	}

	return cleaned, nil
}

func clean(phoneNumber string) (string, error) {
	var cleaned strings.Builder
	cleaned.Grow(len(phoneNumber))

	for _, character := range phoneNumber {
		if unicode.IsDigit(character) {
			cleaned.WriteRune(character)
		}
	}

	cleanedStr := cleaned.String()

	if len(cleanedStr) == 11 && cleanedStr[0] == '1' {
		cleanedStr = cleanedStr[1:]
	}

	if len(cleanedStr) != 10 {
		return "", fmt.Errorf("phone number %v must have 10 digits", cleanedStr)
	}

	return cleanedStr, nil
}

func Format(phoneNumber string) (string, error) {
	number, err := Number(phoneNumber)
	if err != nil {
		return "", err
	}

	return fmt.Sprintf("(%s) %s-%s", number[:3], number[3:6], number[6:]), nil
}