package trinary

import "fmt"

/*ParseTrinary converts a trinary string to an integer.*/
func ParseTrinary(tri string) (int64, error) {
	if len(tri) == 0 {
		return 0, nil
	}
	
	var total int64
	const maxInt64 = 9223372036854775807
	
	for i := 0; i < len(tri); i++ {
		if total > maxInt64/3 {
			return 0, fmt.Errorf("Overflow error, number to large")
		}
		
		total *= 3
		
		switch tri[i] {
		case '0':
		case '1':
			total++
		case '2':
			total += 2
		default:
			return 0, fmt.Errorf("Not a trinary digit: %q[%q]", tri[:i], tri[i:])
		}
	}
	return total, nil
}