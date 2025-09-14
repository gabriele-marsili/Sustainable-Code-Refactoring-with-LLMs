package binary

import (
	"errors"
	"fmt"
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
			msg := fmt.Sprintf("\"%c\" is not a valid digit", v)
			return 0, errors.New(msg)
		}
	}
	return dec, nil
}