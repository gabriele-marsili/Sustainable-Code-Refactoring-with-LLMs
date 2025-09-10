package phonenumber

import (
	"errors"
	"fmt"
	"strings"
)

func CleanNumber(phoneNumber string) (string, error) {
	var sb strings.Builder
	sb.Grow(len(phoneNumber)) // Pre-allocate memory

	for _, c := range phoneNumber {
		if c >= '0' && c <= '9' {
			sb.WriteRune(c)
		}
	}
	return sb.String(), nil
}

func CheckValidN(digit byte) bool {
	return digit >= '2' && digit <= '9'
}

func Number(phoneNumber string) (string, error) {
	clean, _ := CleanNumber(phoneNumber)
	length := len(clean)

	if length < 10 {
		return "", errors.New("invalid - number is less than 10 digits")
	}
	if length > 11 {
		return "", errors.New("invalid - number is greater than 11 digits")
	}

	if length == 11 {
		if clean[0] != '1' {
			return "", errors.New("invalid - country code must be 1")
		}
		clean = clean[1:]
		length = 10 // Update length after trimming
	}

	if !CheckValidN(clean[0]) || !CheckValidN(clean[3]) {
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
	return fmt.Sprintf("(%s) %s-%s", clean[:3], clean[3:6], clean[6:]), nil
}