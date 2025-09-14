package hexadecimal

import "errors"

var (
	errNoDigits    = errors.New("No digits")
	errTooBig      = errors.New("Number is too big, can only handle 16 digits")
	errNotADigit   = errors.New("Not a digit")
)

type rangeError struct {
	message string
}

func (err rangeError) Error() string {
	return err.message
}

type syntaxError struct {
	message string
}

func (err syntaxError) Error() string {
	return err.message
}

func ParseHex(hexString string) (int64, error) {
	if hexString == "" {
		return 0, syntaxError{"No digits"}
	}
	if len(hexString) >= 16 {
		return 0, rangeError{"Number is too big, can only handle 16 digits"}
	}
	
	var dec int64
	for i := 0; i < len(hexString); i++ {
		dec <<= 4
		hexDigit := hexString[i]
		
		if hexDigit >= '0' && hexDigit <= '9' {
			dec |= int64(hexDigit - '0')
		} else if hexDigit >= 'A' && hexDigit <= 'F' {
			dec |= int64(hexDigit - 'A' + 10)
		} else if hexDigit >= 'a' && hexDigit <= 'f' {
			dec |= int64(hexDigit - 'a' + 10)
		} else {
			return 0, syntaxError{"Not a digit"}
		}
	}
	return dec, nil
}

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