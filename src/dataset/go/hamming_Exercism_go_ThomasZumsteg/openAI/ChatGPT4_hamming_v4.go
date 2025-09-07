package hamming

import "errors"

const TestVersion = 2

func Distance(dnaA, dnaB string) (int, error) {
	if len(dnaA) != len(dnaB) {
		return 0, errors.New("strands must be the same length")
	}

	distance := 0
	for i, charA := range dnaA {
		if charA != rune(dnaB[i]) {
			distance++
		}
	}
	return distance, nil
}