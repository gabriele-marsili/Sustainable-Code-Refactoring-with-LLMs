package trinary

import "errors"

/*ParseTrinary converts a trinary string to an integer.*/
func ParseTrinary(tri string) (int64, error) {
	var total int64
	for _, t := range tri {
		if t < '0' || t > '2' {
			return 0, errors.New("invalid trinary digit")
		}
		total = total*3 + int64(t-'0')
		if total < 0 {
			return 0, errors.New("overflow error, number too large")
		}
	}
	return total, nil
}