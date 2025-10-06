package perfect

import "errors"

// Define the Classification type here.
type Classification string

const (
	ClassificationAbundant  Classification = "ClassificationAbundant"
	ClassificationDeficient Classification = "ClassificationDeficient"
	ClassificationPerfect   Classification = "ClassificationPerfect"
)

// Errors
var ErrOnlyPositive error = errors.New("only positive numbers are allowed")

// Calculate the sum of proper divisors of n directly
func getDivisorSum(n int) int {
	if n == 1 {
		return 0
	}
	sum := 1 // 1 is a divisor for all n > 1
	limit := n / 2
	for x := 2; x <= limit; x++ {
		if n%x == 0 {
			sum += x
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

	switch {
	case sum == int(n):
		return ClassificationPerfect, nil
	case sum > int(n):
		return ClassificationAbundant, nil
	default:
		return ClassificationDeficient, nil
	}
}