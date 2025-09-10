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
			return 0, fmt.Errorf("Not a trinary digit: %q", string(t))
		}
		if total > (1<<63-1)/3 {
			return 0, fmt.Errorf("Overflow error, number too large")
		}
		total += digit
		if total < 0 {
			return 0, fmt.Errorf("Overflow error, number too large")
		}
	}
	return total, nil
}