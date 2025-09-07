package hamming

import "errors"

func Distance(a, b string) (int, error) {
	if len(a) != len(b) {
		return 0, errors.New("Cannot calculate Hamming distance between samples of non-equal length.")
	}

	count := 0
	for i, char := range []byte(a) {
		if char != b[i] {
			count++
		}
	}

	return count, nil
}