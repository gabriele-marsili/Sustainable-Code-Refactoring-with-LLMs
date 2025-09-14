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

var (
	noDigitsErr    = syntaxError{"No digits"}
	tooBigErr      = rangeError{"Number is too big, can only handle 16 digits"}
	notDigitErr    = syntaxError{"Not a digit"}
	hexDigitValues = [256]int8{
		'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
		'8': 8, '9': 9, 'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15,
		'a': 10, 'b': 11, 'c': 12, 'd': 13, 'e': 14, 'f': 15,
	}
)

func init() {
	for i := range hexDigitValues {
		if hexDigitValues[i] == 0 && i != '0' {
			hexDigitValues[i] = -1
		}
	}
}

func ParseHex(hexString string) (int64, error) {
	if len(hexString) == 0 {
		return 0, noDigitsErr
	}
	if len(hexString) >= 16 {
		return 0, tooBigErr
	}
	
	var dec int64
	for i := 0; i < len(hexString); i++ {
		b := hexString[i]
		if b > 255 {
			return 0, notDigitErr
		}
		val := hexDigitValues[b]
		if val == -1 {
			return 0, notDigitErr
		}
		dec = (dec << 4) | int64(val)
	}
	return dec, nil
}

func HandleErrors(hexStrings []string) []string {
	if len(hexStrings) == 0 {
		return nil
	}
	
	errorList := make([]string, len(hexStrings))
	for i, hexString := range hexStrings {
		if len(hexString) == 0 {
			errorList[i] = "syntax"
			continue
		}
		if len(hexString) >= 16 {
			errorList[i] = "range"
			continue
		}
		
		valid := true
		hexString = strings.ToLower(hexString)
		for j := 0; j < len(hexString) && valid; j++ {
			b := hexString[j]
			if b > 'f' || (b < '0' || (b > '9' && b < 'a')) {
				valid = false
			}
		}
		
		if valid {
			errorList[i] = "none"
		} else {
			errorList[i] = "syntax"
		}
	}
	return errorList
}