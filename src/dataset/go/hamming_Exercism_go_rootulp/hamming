package hamming

import "errors"

// Distance returns the hamming distance between two DNA strands A and B.
func Distance(a, b string) (int, error) {
	if len(a) != len(b) {
		return 0, errors.New("a and b must be of equal length")
	}

	distance := 0
	for i, charA := range []byte(a) {
		if charA != b[i] {
			distance++
		}
	}
	return distance, nil
}