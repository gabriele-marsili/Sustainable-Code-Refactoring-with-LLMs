package perfect

import "errors"

type Classification string

const ClassificationAbundant Classification = "ClassificationAbundant"
const ClassificationDeficient Classification = "ClassificationDeficient"
const ClassificationPerfect Classification = "ClassificationPerfect"

var ErrOnlyPositive = errors.New("error only positive numbers can be classified")

func Classify(n int64) (Classification, error) {
	if n <= 0 {
		return "", ErrOnlyPositive
	}
	sum := aliquotSum(n)

	if sum < n {
		return ClassificationDeficient, nil
	} else if sum == n {
		return ClassificationPerfect, nil
	} else {
		return ClassificationAbundant, nil
	}
}

func aliquotSum(n int64) int64 {
	if n == 1 {
		return 0
	}
	
	sum := int64(1) // 1 is always a proper divisor for n > 1
	
	// Only check up to sqrt(n)
	for i := int64(2); i*i <= n; i++ {
		if n%i == 0 {
			sum += i
			// Add the corresponding factor if it's different and not equal to n
			if i != n/i && n/i != n {
				sum += n / i
			}
		}
	}
	
	return sum
}

func getFactors(n int64) (factors []int64) {
	if n == 1 {
		return []int64{}
	}
	
	factors = append(factors, 1)
	
	for i := int64(2); i*i <= n; i++ {
		if n%i == 0 {
			factors = append(factors, i)
			if i != n/i && n/i != n {
				factors = append(factors, n/i)
			}
		}
	}
	
	return factors
}