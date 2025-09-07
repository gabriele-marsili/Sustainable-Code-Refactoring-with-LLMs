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

	// Handle edge case
	if n == 1 {
		return ClassificationDeficient, nil
	}

	// Calculate sum of proper divisors directly
	sum := int64(1) // 1 is always a proper divisor for n > 1
	
	// Only check up to sqrt(n) to find divisor pairs
	for i := int64(2); i*i <= n; i++ {
		if n%i == 0 {
			sum += i
			// Add the corresponding divisor if it's different and not n itself
			if i != n/i && n/i != n {
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