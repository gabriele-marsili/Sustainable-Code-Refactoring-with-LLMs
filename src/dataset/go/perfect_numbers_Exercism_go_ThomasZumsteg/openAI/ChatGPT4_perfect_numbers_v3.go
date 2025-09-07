package perfect

import "errors"

type Classification string

var ErrOnlyPositive = errors.New("Must be 1 or greater")

const (
	ClassificationPerfect   Classification = "perfect"
	ClassificationAbundant  Classification = "abundant"
	ClassificationDeficient Classification = "deficient"
)

func Classify(number int64) (Classification, error) {
	if number <= 0 {
		return "", ErrOnlyPositive
	}
	if number == 1 {
		return ClassificationDeficient, nil
	}

	var total int64 = 1
	limit := int64(2)
	for ; limit*limit <= number; limit++ {
		if number%limit == 0 {
			total += limit
			if limit*limit != number {
				total += number / limit
			}
		}
	}
	switch {
	case total == number:
		return ClassificationPerfect, nil
	case total > number:
		return ClassificationAbundant, nil
	default:
		return ClassificationDeficient, nil
	}
}