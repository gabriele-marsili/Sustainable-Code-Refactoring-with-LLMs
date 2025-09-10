package hexadecimal

import "strings"

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
	hexString = strings.ToLower(hexString)
	length := len(hexString)

	if length == 0 {
		return 0, syntaxError{"No digits"}
	}

	if length > 16 {
		return 0, rangeError{"Number is too big, can only handle 16 digits"}
	}

	var dec int64
	for i := 0; i < length; i++ {
		hexDigit := hexString[i]
		dec <<= 4
		var digit int64
		switch hexDigit {
		case '0':
			digit = 0
		case '1':
			digit = 1
		case '2':
			digit = 2
		case '3':
			digit = 3
		case '4':
			digit = 4
		case '5':
			digit = 5
		case '6':
			digit = 6
		case '7':
			digit = 7
		case '8':
			digit = 8
		case '9':
			digit = 9
		case 'a':
			digit = 10
		case 'b':
			digit = 11
		case 'c':
			digit = 12
		case 'd':
			digit = 13
		case 'e':
			digit = 14
		case 'f':
			digit = 15
		default:
			return 0, syntaxError{"Not a digit"}
		}
		dec |= digit
	}
	return dec, nil
}

func HandleErrors(hexStrings []string) []string {
	errorList := make([]string, len(hexStrings))
	for i, hexString := range hexStrings {
		_, err := ParseHex(hexString)
		if err != nil {
			switch err.(type) {
			case rangeError:
				errorList[i] = "range"
			case syntaxError:
				errorList[i] = "syntax"
			default:
				errorList[i] = "none"
			}
		} else {
			errorList[i] = "none"
		}
	}
	return errorList
}