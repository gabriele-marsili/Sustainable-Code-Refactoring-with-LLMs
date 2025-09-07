package hamming

//TestVersion is the unit tests that this program passes
const TestVersion = 2

/*Distance is the hamming distance between two strands of DNA
strands must be the same length*/
func Distance(dnaA, dnaB string) (int, *string) {
	lenA := len(dnaA)
	if lenA != len(dnaB) {
		error := "Strands must be the same length"
		return 0, &error
	}

	distance := 0
	for i := 0; i < lenA; i++ {
		if dnaA[i] != dnaB[i] {
			distance++
		}
	}
	return distance, nil
}