package perfect

import "errors"

// Define the Classification type here.
type Classification string

const ClassificationAbundant Classification = "ClassificationAbundant"
const ClassificationDeficient Classification = "ClassificationDeficient"
const ClassificationPerfect Classification = "ClassificationPerfect"

// Errors
var ErrOnlyPositive error = errors.New("only positive numbers are allowed")

// Find the sum of positive divisors for a number n
func getDivisorSum(n int) int {
	sum := 1
	sqrt := int(float64(n) / 2)
	for x := 2; x <= sqrt; x++ {
		if n%x == 0 {
			sum += x
			if x != n/x {
				sum += n / x
			}
		}
	}
	return sum
}

func Classify(n int64) (Classification, error) {
	// Error handling
	if n <= 0 {
		return "", ErrOnlyPositive
	}

	sum := getDivisorSum(int(n))

	if sum == int(n) {
		return ClassificationPerfect, nil
	} else if sum > int(n) {
		return ClassificationAbundant, nil
	} else {
		return ClassificationDeficient, nil
	}
}