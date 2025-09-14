package binary

import (
	"errors"
)

/*ParseBinary converts a string of binary digits to the decial equivalant
or returns an error.*/
func ParseBinary(bin string) (int, error) {
	dec := 0
	for i := 0; i < len(bin); i++ {
		v := bin[i]
		switch v {
		case '0':
			dec <<= 1
		case '1':
			dec = (dec << 1) | 1
		default:
			return 0, errors.New("invalid binary digit")
		}
	}
	return dec, nil
}