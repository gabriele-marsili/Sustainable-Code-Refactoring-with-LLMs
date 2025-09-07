package perfect

import "errors"

type Classification string

const (
	ClassificationAbundant  Classification = "ClassificationAbundant"
	ClassificationDeficient Classification = "ClassificationDeficient"
	ClassificationPerfect   Classification = "ClassificationPerfect"
)

var ErrOnlyPositive = errors.New("error only positive numbers can be classified")

func Classify(n int64) (Classification, error) {
	if n <= 0 {
		return "", ErrOnlyPositive
	}
	sum := aliquotSum(n)

	switch {
	case sum < n:
		return ClassificationDeficient, nil
	case sum == n:
		return ClassificationPerfect, nil
	default:
		return ClassificationAbundant, nil
	}
}

func aliquotSum(n int64) (sum int64) {
	for i := int64(1); i*i <= n; i++ {
		if n%i == 0 {
			sum += i
			if i != 1 && i != n/i {
				sum += n / i
			}
		}
	}
	return sum
}