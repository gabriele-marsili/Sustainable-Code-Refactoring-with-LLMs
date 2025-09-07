package perfect

import "errors"

type Classification string

const ClassificationAbundant Classification = "ClassificationAbundant"
const ClassificationDeficient Classification = "ClassificationDeficient"
const ClassificationPerfect Classification = "ClassificationPerfect"

var ErrOnlyPositive error = errors.New("only positive numbers are allowed")

func getDivisors(n int) []int {
	if n == 1 {
		return []int{}
	}
	
	result := make([]int, 0, n/2)
	result = append(result, 1)
	
	for x := 2; x*x <= n; x++ {
		if n%x == 0 {
			result = append(result, x)
			if x != n/x {
				result = append(result, n/x)
			}
		}
	}
	return result
}

func getDivisorSum(array []int) int {
	sum := 0
	for _, divisor := range array {
		sum += divisor
	}
	return sum
}

func Classify(n int64) (Classification, error) {
	if n <= 0 {
		return "", ErrOnlyPositive
	}

	if n == 1 {
		return ClassificationDeficient, nil
	}

	sum := 1
	for x := 2; x*x <= int(n); x++ {
		if int(n)%x == 0 {
			sum += x
			if x != int(n)/x {
				sum += int(n) / x
			}
		}
	}

	if sum == int(n) {
		return ClassificationPerfect, nil
	} else if sum > int(n) {
		return ClassificationAbundant, nil
	} else {
		return ClassificationDeficient, nil
	}
}