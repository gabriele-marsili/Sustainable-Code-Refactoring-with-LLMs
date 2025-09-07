package perfect

import "errors"

// Define the Classification type here.
type Classification string

const ClassificationAbundant Classification = "ClassificationAbundant"
const ClassificationDeficient Classification = "ClassificationDeficient"
const ClassificationPerfect Classification = "ClassificationPerfect"

// Errors
var ErrOnlyPositive error = errors.New("only positive numbers are allowed")

func Classify(n int64) (Classification, error) {
	// Error handling
	if n <= 0 {
		return "", ErrOnlyPositive
	}

	// Calculate sum of proper divisors directly without storing them
	sum := int64(1) // 1 is always a proper divisor for n > 1
	if n == 1 {
		sum = 0
	}

	// Only check up to sqrt(n) for efficiency
	for i := int64(2); i*i <= n; i++ {
		if n%i == 0 {
			sum += i
			// Add the corresponding divisor if it's different
			if i != n/i {
				sum += n/i
			}
		}
	}

	if sum == n {
		return ClassificationPerfect, nil
	} else if sum > n {
		return ClassificationAbundant, nil
	} else {
		return ClassificationDeficient, nil
	}
}