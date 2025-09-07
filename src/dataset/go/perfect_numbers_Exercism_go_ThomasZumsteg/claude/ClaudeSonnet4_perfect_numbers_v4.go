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
	if number == 1 {
		return ClassificationDeficient, nil
	}

	total := int64(1)
	sqrt := int64(1)
	for sqrt*sqrt < number {
		sqrt++
	}
	
	for i := int64(2); i < sqrt; i++ {
		if number%i == 0 {
			total += i + number/i
		}
	}
	
	if sqrt*sqrt == number {
		total += sqrt
	}

	if total < number {
		return ClassificationDeficient, nil
	}
	if total > number {
		return ClassificationAbundant, nil
	}
	return ClassificationPerfect, nil
}