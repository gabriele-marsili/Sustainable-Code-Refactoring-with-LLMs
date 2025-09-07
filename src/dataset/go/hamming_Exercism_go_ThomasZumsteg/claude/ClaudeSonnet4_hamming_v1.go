package hamming

//TestVersion is the unit tests that this program passes
const TestVersion = 2

/*Distance is the hamming distance between two strands of DNA
strands must be the same length*/
func Distance(dnaA, dnaB string) (int, *string) {
	if len(dnaA) != len(dnaB) {
		error := "Strands must be the same length"
		return 0, &error
	}

	distance := 0
	for i := 0; i < len(dnaA); i++ {
		if dnaA[i] != dnaB[i] {
			distance++
		}
	}
	return distance, nil
}