package octal

import (
	"errors"
)

/*ParseOctal converts a string of octal digits to a decimal number.*/
func ParseOctal(oct string) (int64, error) {
	if len(oct) == 0 {
		return 0, nil
	}
	
	var dec int64
	for i := 0; i < len(oct); i++ {
		octDigit := oct[i]
		if octDigit < '0' || octDigit > '7' {
			return 0, errors.New("invalid octal digit")
		}
		dec = (dec << 3) + int64(octDigit-'0')
	}
	return dec, nil
}