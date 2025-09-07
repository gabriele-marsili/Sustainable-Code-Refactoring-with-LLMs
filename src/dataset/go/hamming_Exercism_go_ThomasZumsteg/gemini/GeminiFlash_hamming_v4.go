package hamming

import "fmt"

// TestVersion is the unit tests that this program passes
const TestVersion = 2

/*Distance is the hamming distance between two strands of DNA
strands must be the same length*/
func Distance(dnaA, dnaB string) (int, *string) {
	lenA := len(dnaA)
	lenB := len(dnaB)

	if lenA != lenB {
		errStr := fmt.Sprintf("Strands must be the same length\n%s\n%s", dnaA, dnaB)
		return 0, &errStr
	}

	distance := 0
	for i := 0; i < lenA; i++ {
		if dnaA[i] != dnaB[i] {
			distance++
		}
	}
	return distance, nil
}