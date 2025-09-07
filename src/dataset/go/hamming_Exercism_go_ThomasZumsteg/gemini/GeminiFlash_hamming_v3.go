package hamming

// TestVersion is the unit tests that this program passes
const TestVersion = 2

/*Distance is the hamming distance between two strands of DNA
strands must be the same length*/
func Distance(dnaA, dnaB string) (int, error) {
	lenA := len(dnaA)
	lenB := len(dnaB)

	if lenA != lenB {
		return 0, ErrDifferentLength(dnaA, dnaB)
	}

	distance := 0
	for i := 0; i < lenA; i++ {
		if dnaA[i] != dnaB[i] {
			distance++
		}
	}
	return distance, nil
}

type diffLengthError struct {
	dnaA string
	dnaB string
}

func (e diffLengthError) Error() string {
	return "Strands must be the same length"
}

// ErrDifferentLength returns an error indicating that the DNA strands are of different lengths.
func ErrDifferentLength(dnaA, dnaB string) error {
	return diffLengthError{dnaA: dnaA, dnaB: dnaB}
}