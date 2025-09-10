package trinary

import (
	"errors"
	"fmt"
)

/*ParseTrinary converts a trinary string to an integer.*/
func ParseTrinary(tri string) (int64, error) {
	var total int64
	for i := 0; i < len(tri); i++ {
		t := tri[i]
		if t < '0' || t > '2' {
			return 0, fmt.Errorf("Not a trinary digit: %q[%q]", tri[:i], tri[i:])
		}
		total = total*3 + int64(t-'0')
		if total < 0 {
			return 0, errors.New("Overflow error, number too large")
		}
	}
	return total, nil
}