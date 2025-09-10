package hexadecimal

import (
	"strings"
)

// rangeErrors are when a hex number is too big
type rangeError struct {
	message string
}

// Error makes a rangeError into a string.
func (err rangeError) Error() string {
	return err.message
}

// syntaxErrors are when a hex number isn't properly formatted.
type syntaxError struct {
	message string
}

// Error makes syntaxErrors into a string.
func (err syntaxError) Error() string {
	return err.message
}

// ParseHex converts a hexadecimal string to an integer.
func ParseHex(hexString string) (int64, error) {
	hexString = strings.TrimSpace(hexString)
	length := len(hexString)
	if length == 0 {
		return 0, syntaxError{"No digits"}
	} else if length > 16 {
		return 0, rangeError{"Number is too big, can only handle 16 digits"}
	}

	var dec int64
	for _, hexDigit := range hexString {
		dec <<= 4
		switch {
		case hexDigit >= '0' && hexDigit <= '9':
			dec |= int64(hexDigit - '0')
		case hexDigit >= 'A' && hexDigit <= 'F':
			dec |= int64(hexDigit - 'A' + 10)
		case hexDigit >= 'a' && hexDigit <= 'f':
			dec |= int64(hexDigit - 'a' + 10)
		default:
			return 0, syntaxError{"Not a digit"}
		}
	}
	return dec, nil
}

// HandleErrors reports errors converting hex numbers.
func HandleErrors(hexStrings []string) []string {
	errorList := make([]string, len(hexStrings))
	for i, hexString := range hexStrings {
		_, err := ParseHex(hexString)
		switch err.(type) {
		case rangeError:
			errorList[i] = "range"
		case syntaxError:
			errorList[i] = "syntax"
		default:
			errorList[i] = "none"
		}
	}
	return errorList
}