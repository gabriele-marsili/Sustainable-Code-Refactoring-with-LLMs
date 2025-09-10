package binary

import (
	"errors"
	"fmt"
)

func ParseBinary(bin string) (int, error) {
	dec := 0
	for i := 0; i < len(bin); i++ {
		switch bin[i] {
		case '0':
			dec <<= 1
		case '1':
			dec = (dec << 1) | 1
		default:
			return 0, errors.New(fmt.Sprintf("\"%c\" is not a valid binary digit", bin[i]))
		}
	}
	return dec, nil
}