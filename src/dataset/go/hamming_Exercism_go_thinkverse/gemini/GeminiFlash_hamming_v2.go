package hamming

import (
	"errors"
)

func Distance(a, b string) (int, error) {
	lenA := len(a)
	if lenA != len(b) {
		return 0, errors.New("Cannot calculate Hamming distance between samples or non-equal length.")
	}

	distance := 0
	for i := 0; i < lenA; i++ {
		if a[i] != b[i] {
			distance++
		}
	}

	return distance, nil
}