package trinary

import "fmt"

/*ParseTrinary converts a trinary string to an integer.*/
func ParseTrinary(tri string) (int64, error) {
	var total int64
	for _, t := range tri {
		total *= 3
		switch t {
		case '0':
		case '1':
			total += 1
		case '2':
			total += 2
		default:
			return 0, fmt.Errorf("invalid trinary digit: %q", t)
		}
		if total > (1<<62)-1 {
			return 0, fmt.Errorf("overflow error, number too large")
		}
	}
	return total, nil
}