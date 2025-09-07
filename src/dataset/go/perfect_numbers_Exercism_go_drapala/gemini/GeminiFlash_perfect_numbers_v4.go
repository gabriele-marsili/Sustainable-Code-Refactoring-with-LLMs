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

	sum := int64(0)
	for i := int64(1); i*i <= n; i++ {
		if n%i == 0 {
			if i*i != n && i != n {
				sum += i
				sum += n / i
			} else if i != n {
				sum += i
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