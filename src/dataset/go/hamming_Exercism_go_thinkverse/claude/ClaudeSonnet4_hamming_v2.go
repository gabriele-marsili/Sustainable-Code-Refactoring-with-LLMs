package hamming

import (
	"errors"
)

func Distance(a, b string) (int, error) {
	if len(a) != len(b) {
		return 0, errors.New("Cannot calculate Hamming distance between samples or non-equal length.")
	}

	var count int
	aBytes := []byte(a)
	bBytes := []byte(b)

	for i := 0; i < len(aBytes); i++ {
		if aBytes[i] != bBytes[i] {
			count++
		}
	}

	return count, nil
}