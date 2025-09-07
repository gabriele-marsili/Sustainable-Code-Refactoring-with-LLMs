package hamming

import "errors"

func Distance(a, b string) (int, error) {
	if len(a) != len(b) {
		return 0, errors.New("strings are of different lengths")
	}
	diff := 0
	for i, char := range a {
		if char != rune(b[i]) {
			diff++
		}
	}
	return diff, nil
}