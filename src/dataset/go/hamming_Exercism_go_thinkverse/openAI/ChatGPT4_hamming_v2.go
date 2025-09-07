package hamming

import "errors"

func Distance(a, b string) (int, error) {
	if len(a) != len(b) {
		return 0, errors.New("inputs must have the same length")
	}

	count := 0
	for i := 0; i < len(a); i++ {
		count += int(a[i] ^ b[i] >> 7)
	}

	return count, nil
}