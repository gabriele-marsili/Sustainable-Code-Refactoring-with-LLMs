package phonenumber

import (
	"errors"
	"strings"
)

func CleanNumber(phoneNumber string) (string, error) {
	var result strings.Builder
	result.Grow(len(phoneNumber))

	for _, c := range phoneNumber {
		if c >= '0' && c <= '9' {
			result.WriteRune(c)
		}
	}
	return result.String(), nil
}

func CheckValidN(digit rune) bool {
	return digit >= '2' && digit <= '9'
}

func Number(phoneNumber string) (string, error) {
	clean, _ := CleanNumber(phoneNumber)
	cleanLen := len(clean)

	if cleanLen < 10 {
		return "", errors.New("invalid - number is less than 10 digits")
	}
	if cleanLen > 11 {
		return "", errors.New("invalid - number is greater than 11 digits")
	}

	if cleanLen == 11 {
		if clean[0] != '1' {
			return "", errors.New("invalid - country code must be 1")
		}
		clean = clean[1:]
	}
	
	if !CheckValidN(rune(clean[0])) || !CheckValidN(rune(clean[3])) {
		return "", errors.New("invalid N - '2' <= N <= '9'")
	}

	return clean, nil
}

func AreaCode(phoneNumber string) (string, error) {
	clean, err := Number(phoneNumber)
	if err != nil {
		return "", err
	}
	return clean[:3], nil
}

func Format(phoneNumber string) (string, error) {
	clean, err := Number(phoneNumber)
	if err != nil {
		return "", err
	}
	
	var result strings.Builder
	result.Grow(14)
	result.WriteByte('(')
	result.WriteString(clean[:3])
	result.WriteString(") ")
	result.WriteString(clean[3:6])
	result.WriteByte('-')
	result.WriteString(clean[6:])
	
	return result.String(), nil
}