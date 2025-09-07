package hamming

import "errors"

const TestVersion = 2

var ErrDifferentLengths = errors.New("strands must be the same length")

func Distance(dnaA, dnaB string) (int, *string) {
	if len(dnaA) != len(dnaB) {
		errorStr := ErrDifferentLengths.Error()
		return 0, &errorStr
	}

	distance := 0
	for i := 0; i < len(dnaA); i++ {
		if dnaA[i] != dnaB[i] {
			distance++
		}
	}
	return distance, nil
}