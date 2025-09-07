package octal

import (
	"errors"
)

/*ParseOctal converts a string of octal digits to a decimal number.*/
func ParseOctal(oct string) (int64, error) {
	var dec int64
	for i := 0; i < len(oct); i++ {
		octDigit := oct[i]
		if octDigit < '0' || '7' < octDigit {
			return 0, errors.New("invalid octal digit")
		}
		dec = (dec << 3) + int64(octDigit-'0')
	}
	return dec, nil
}