package hamming

// TestVersion is the unit tests that this program passes
const TestVersion = 2

/*Distance is the hamming distance between two strands of DNA
strands must be the same length*/
func Distance(dnaA, dnaB string) (int, error) {
	lenA := len(dnaA)
	lenB := len(dnaB)

	if lenA != lenB {
		return 0, fmt.Errorf("strands must be the same length: len(a)=%d, len(b)=%d", lenA, lenB)
	}

	distance := 0
	for i := 0; i < lenA; i++ {
		if dnaA[i] != dnaB[i] {
			distance++
		}
	}
	return distance, nil
}