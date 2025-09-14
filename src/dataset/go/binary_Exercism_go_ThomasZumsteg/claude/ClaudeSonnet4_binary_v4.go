package binary

import (
	"errors"
	"fmt"
)

/*ParseBinary converts a string of binary digits to the decial equivalant
or returns an error.*/
func ParseBinary(bin string) (int, error) {
	dec := 0
	for _, v := range bin {
		switch v {
		case '0':
			dec <<= 1
		case '1':
			dec = (dec << 1) | 1
		default:
			return 0, fmt.Errorf("\"%c\" is not a valid binary digit", v)
		}
	}
	return dec, nil
}