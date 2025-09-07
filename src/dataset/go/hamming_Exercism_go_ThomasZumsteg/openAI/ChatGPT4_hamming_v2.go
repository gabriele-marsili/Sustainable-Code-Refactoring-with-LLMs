package hamming

import "errors"

// TestVersion is the unit tests that this program passes
const TestVersion = 2

// Distance calculates the Hamming distance between two strands of DNA.
// Strands must be the same length.
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