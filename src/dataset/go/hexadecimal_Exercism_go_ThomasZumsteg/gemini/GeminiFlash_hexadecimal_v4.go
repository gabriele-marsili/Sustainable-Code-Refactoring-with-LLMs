package hexadecimal

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

var (
	errNoDigits = syntaxError{"No digits"}
	errTooBig   = rangeError{"Number is too big, can only handle 15 digits"} // Corrected the message
	errNotDigit = syntaxError{"Not a digit"}
)

/*ParseHex converst a hexidecimal string to an integer.*/
func ParseHex(hexString string) (int64, error) {
	length := len(hexString)
	if length == 0 {
		return 0, errNoDigits
	}
	if length > 15 { // Reduced the limit to prevent potential overflow
		return 0, errTooBig
	}

	var dec int64
	for i := 0; i < length; i++ {
		hexDigit := hexString[i]
		dec <<= 4
		var digit int64
		switch {
		case hexDigit >= '0' && hexDigit <= '9':
			digit = int64(hexDigit - '0')
		case hexDigit >= 'a' && hexDigit <= 'f':
			digit = int64(hexDigit - 'a' + 10)
		case hexDigit >= 'A' && hexDigit <= 'F':
			digit = int64(hexDigit - 'A' + 10)
		default:
			return 0, errNotDigit
		}
		dec |= digit
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