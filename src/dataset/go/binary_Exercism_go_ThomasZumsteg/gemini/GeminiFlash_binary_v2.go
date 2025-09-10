package binary

import (
	"errors"
)

/*ParseBinary converts a string of binary digits to the decial equivalant
or returns an error.*/
func ParseBinary(bin string) (int, error) {
	dec := 0
	for _, v := range bin {
		if v == '0' {
			dec <<= 1
		} else if v == '1' {
			dec = (dec << 1) | 1
		} else {
			return 0, errors.New("invalid binary digit")
		}
	}
	return dec, nil
}