package hexadecimal

import "strings"

// rangeErrors are when a hex number is too big
type rangeError struct {
	message string
}

/*Error makes a rangeError into a string.*/
func (err rangeError) Error() string {
	return err.message
}

/*syntaxErrors are when a hex number isn't properly formatted.*/
type syntaxError struct {
	message string
}

/*Error make syntaxErrors into a string.*/
func (err syntaxError) Error() string {
	return err.message
}

var hexMap = map[rune]int64{
	'0': 0, '1': 1, '2': 2, '3': 3, '4': 4,
	'5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
	'a': 10, 'b': 11, 'c': 12, 'd': 13, 'e': 14, 'f': 15,
	'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15,
}

/*ParseHex converst a hexidecimal string to an integer.*/
func ParseHex(hexString string) (int64, error) {
	hexString = strings.TrimSpace(hexString)
	if len(hexString) == 0 {
		return 0, syntaxError{"No digits"}
	}
	if len(hexString) > 16 {
		return 0, rangeError{"Number is too big, can only handle 16 digits"}
	}

	var dec int64
	for _, hexDigit := range hexString {
		val, ok := hexMap[hexDigit]
		if !ok {
			return 0, syntaxError{"Not a digit"}
		}
		dec = (dec << 4) | val
	}
	return dec, nil
}

/*HandleErrors report errors converting hex numbers.*/
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
				errorList[i] = "none" // Should not happen, but handle it anyway
			}
		} else {
			errorList[i] = "none"
		}
	}
	return errorList
}