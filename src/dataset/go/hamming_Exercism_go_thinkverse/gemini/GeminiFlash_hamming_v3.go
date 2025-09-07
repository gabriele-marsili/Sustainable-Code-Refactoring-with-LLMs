package hamming

import (
	"errors"
)

func Distance(a, b string) (int, error) {
	if len(a) != len(b) {
		return 0, errors.New("Cannot calculate Hamming distance between samples or non-equal length.")
	}

	count := 0
	lenA := len(a)

	for i := 0; i < lenA; i++ {
		if a[i] != b[i] {
			count++
		}
	}

	return count, nil
}