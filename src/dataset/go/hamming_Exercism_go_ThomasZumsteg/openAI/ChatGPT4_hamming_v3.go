package hamming

import "errors"

// TestVersion is the unit tests that this program passes
const TestVersion = 2

// Distance calculates the Hamming distance between two strands of DNA
func Distance(dnaA, dnaB string) (int, *string) {
	if len(dnaA) != len(dnaB) {
		err := errors.New("strands must be the same length")
		return 0, &err.Error()
	}

	distance := 0
	for i, charA := range dnaA {
		if charA != rune(dnaB[i]) {
			distance++
		}
	}
	return distance, nil
}