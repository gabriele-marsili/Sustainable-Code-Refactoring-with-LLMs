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
	if n <= 0 {
		return "", ErrOnlyPositive
	}

	sum := int64(1) // 1 is always a divisor
	for i := int64(2); i*i <= n; i++ {
		if n%i == 0 {
			sum += i
			if i*i != n {
				sum += n / i
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