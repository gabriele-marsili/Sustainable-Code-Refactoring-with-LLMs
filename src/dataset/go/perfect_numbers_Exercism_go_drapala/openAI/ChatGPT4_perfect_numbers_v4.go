package perfect

import "errors"

type Classification string

const (
	ClassificationAbundant  Classification = "ClassificationAbundant"
	ClassificationDeficient Classification = "ClassificationDeficient"
	ClassificationPerfect   Classification = "ClassificationPerfect"
)

var ErrOnlyPositive error = errors.New("only positive numbers are allowed")

func Classify(n int64) (Classification, error) {
	if n <= 0 {
		return "", ErrOnlyPositive
	}

	sum := 1
	limit := int(n)
	for i := 2; i*i <= limit; i++ {
		if limit%i == 0 {
			sum += i
			if i != limit/i {
				sum += limit / i
			}
		}
	}

	if sum == limit {
		return ClassificationPerfect, nil
	} else if sum > limit {
		return ClassificationAbundant, nil
	} else {
		return ClassificationDeficient, nil
	}
}