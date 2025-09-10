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

/*ParseHex converst a hexidecimal string to an integer.*/
func ParseHex(hexString string) (int64, error) {
	hexString = strings.ToLower(hexString)
	if hexString == "" {
		return 0, syntaxError{"No digits"}
	}
	if len(hexString) > 16 {
		return 0, rangeError{"Number is too big, can only handle 16 digits"}
	}

	var dec int64
	for _, hexDigit := range hexString {
		dec <<= 4
		var digitValue int64
		switch hexDigit {
		case '0':
			digitValue = 0
		case '1':
			digitValue = 1
		case '2':
			digitValue = 2
		case '3':
			digitValue = 3
		case '4':
			digitValue = 4
		case '5':
			digitValue = 5
		case '6':
			digitValue = 6
		case '7':
			digitValue = 7
		case '8':
			digitValue = 8
		case '9':
			digitValue = 9
		case 'a':
			digitValue = 10
		case 'b':
			digitValue = 11
		case 'c':
			digitValue = 12
		case 'd':
			digitValue = 13
		case 'e':
			digitValue = 14
		case 'f':
			digitValue = 15
		default:
			return 0, syntaxError{"Not a digit"}
		}
		dec |= digitValue
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