package hexadecimal

import (
	"errors"
	"strings"
)

type rangeError string

func (err rangeError) Error() string {
	return string(err)
}

type syntaxError string

func (err syntaxError) Error() string {
	return string(err)
}

func ParseHex(hexString string) (int64, error) {
	if hexString == "" {
		return 0, syntaxError("No digits")
	}
	if len(hexString) >= 16 {
		return 0, rangeError("Number is too big, can only handle 16 digits")
	}

	var dec int64
	for _, hexDigit := range strings.ToLower(hexString) {
		dec <<= 4
		switch {
		case '0' <= hexDigit && hexDigit <= '9':
			dec |= int64(hexDigit - '0')
		case 'a' <= hexDigit && hexDigit <= 'f':
			dec |= int64(hexDigit - 'a' + 10)
		default:
			return 0, syntaxError("Not a digit")
		}
	}
	return dec, nil
}

func HandleErrors(hexStrings []string) []string {
	errorList := make([]string, len(hexStrings))
	for i, hexString := range hexStrings {
		_, err := ParseHex(hexString)
		if errors.As(err, &rangeError("")) {
			errorList[i] = "range"
		} else if errors.As(err, &syntaxError("")) {
			errorList[i] = "syntax"
		} else {
			errorList[i] = "none"
		}
	}
	return errorList
}