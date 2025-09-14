package phonenumber

import (
	"errors"
	"strings"
)

func CleanNumber(phoneNumber string) (string, error) {
	result := make([]byte, 0, len(phoneNumber))
	
	for i := 0; i < len(phoneNumber); i++ {
		c := phoneNumber[i]
		if c >= '0' && c <= '9' {
			result = append(result, c)
		}
	}
	return string(result), nil
}

func CheckValidN(digit rune) bool {
	return digit >= '2' && digit <= '9'
}

func Number(phoneNumber string) (string, error) {
	clean, _ := CleanNumber(phoneNumber)

	// Error handling
	cleanLen := len(clean)
	if cleanLen < 10 {
		return "", errors.New("invalid - number is less than 10 digits")
	}
	if cleanLen > 11 {
		return "", errors.New("invalid - number is greater than 11 digits")
	}

	// Handle 11 digits case to homogenize remainder of operations
	if cleanLen == 11 {
		if clean[0] != '1' {
			return "", errors.New("invalid - country code must be 1")
		}
		clean = clean[1:]
	}
	
	// Handle invalid N: NXX NXX XXXX
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
	result.Grow(14) // Pre-allocate for "(xxx) xxx-xxxx"
	result.WriteByte('(')
	result.WriteString(clean[:3])
	result.WriteString(") ")
	result.WriteString(clean[3:6])
	result.WriteByte('-')
	result.WriteString(clean[6:])
	
	return result.String(), nil
}