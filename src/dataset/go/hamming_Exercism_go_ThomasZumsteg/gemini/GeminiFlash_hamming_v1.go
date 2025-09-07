package hamming

// TestVersion is the unit tests that this program passes
const TestVersion = 2

// Distance calculates the Hamming distance between two DNA strands.
// It returns an error if the strands are of different lengths.
func Distance(dnaA, dnaB string) (int, error) {
	lenA := len(dnaA)
	lenB := len(dnaB)

	if lenA != lenB {
		return 0, ErrDifferentLength
	}

	distance := 0
	for i := 0; i < lenA; i++ {
		if dnaA[i] != dnaB[i] {
			distance++
		}
	}
	return distance, nil
}

// ErrDifferentLength is a pre-defined error for strands of different lengths.
var ErrDifferentLength = errorString("Strands must be the same length")

// errorString is a helper type to create error messages.
type errorString string

func (e errorString) Error() string {
	return string(e)
}