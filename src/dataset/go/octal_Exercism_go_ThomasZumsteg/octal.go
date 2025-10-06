package octal

import (
	"errors"
)

/*ParseOctal converts a string of octal digits to a decimal number.*/
func ParseOctal(oct string) (int64, error) {
	var dec int64
	for _, octDigit := range oct {
		if octDigit < '0' || octDigit > '7' {
			return 0, errors.New("invalid character in input")
		}
		dec = dec*8 + int64(octDigit-'0')
	}
	return dec, nil
}