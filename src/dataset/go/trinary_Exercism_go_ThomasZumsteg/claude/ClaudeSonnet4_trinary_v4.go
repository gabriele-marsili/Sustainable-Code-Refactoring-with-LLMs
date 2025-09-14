package trinary

import "errors"

var (
	errInvalidDigit = errors.New("invalid trinary digit")
	errOverflow     = errors.New("overflow error, number too large")
)

func ParseTrinary(tri string) (int64, error) {
	if len(tri) == 0 {
		return 0, nil
	}
	
	const maxSafeLength = 40
	if len(tri) > maxSafeLength {
		return 0, errOverflow
	}
	
	var total int64
	for _, b := range []byte(tri) {
		if b < '0' || b > '2' {
			return 0, errInvalidDigit
		}
		
		if total > (1<<63-1)/3 {
			return 0, errOverflow
		}
		
		total = total*3 + int64(b-'0')
	}
	
	return total, nil
}