package trinary

import "fmt"

/*ParseTrinary converts a trinary string to an integer.*/
func ParseTrinary(tri string) (int64, error) {
	if len(tri) == 0 {
		return 0, nil
	}
	
	var total int64
	for i := 0; i < len(tri); i++ {
		t := tri[i]
		if t < '0' || t > '2' {
			return 0, fmt.Errorf("Not a trinary digit: %q[%q]", tri[:i], tri[i:])
		}
		
		newTotal := total*3 + int64(t-'0')
		if newTotal < total {
			return 0, fmt.Errorf("Overflow error, number to large")
		}
		total = newTotal
	}
	return total, nil
}