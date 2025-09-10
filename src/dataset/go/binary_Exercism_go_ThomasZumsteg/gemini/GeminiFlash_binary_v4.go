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
		if v != '0' && v != '1' {
			return 0, errors.New("invalid binary digit")
		}
		dec = dec*2 + int(v-'0')
	}
	return dec, nil
}