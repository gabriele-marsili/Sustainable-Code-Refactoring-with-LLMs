package perfect

import "errors"

type Classification string

var ErrOnlyPositive error = errors.New("Must be 1 or greater")

const (
	ClassificationPerfect   Classification = "perfect"
	ClassificationAbundant  Classification = "abundant"
	ClassificationDeficient Classification = "deficient"
)

func Classify(number int64) (Classification, error) {
	if number <= 0 {
		return "", ErrOnlyPositive
	}

	var sum int64 = 1
	for i := int64(2); i*i <= number; i++ {
		if number%i == 0 {
			sum += i
			if i*i != number {
				sum += number / i
			}
		}
	}

	if sum == number {
		return ClassificationPerfect, nil
	} else if sum < number {
		return ClassificationDeficient, nil
	} else {
		return ClassificationAbundant, nil
	}
}