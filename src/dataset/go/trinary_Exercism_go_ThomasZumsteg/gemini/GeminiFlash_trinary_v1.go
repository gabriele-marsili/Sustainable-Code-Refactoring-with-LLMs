package trinary

import "fmt"

/*ParseTrinary converts a trinary string to an integer.*/
func ParseTrinary(tri string) (int64, error) {
	var total int64
	for _, t := range tri {
		total *= 3
		var digit int64
		switch t {
		case '0':
			digit = 0
		case '1':
			digit = 1
		case '2':
			digit = 2
		default:
			return 0, fmt.Errorf("invalid trinary digit: %c", t)
		}
		total += digit
		if total < 0 {
			return 0, fmt.Errorf("overflow error, number too large")
		}
	}
	return total, nil
}