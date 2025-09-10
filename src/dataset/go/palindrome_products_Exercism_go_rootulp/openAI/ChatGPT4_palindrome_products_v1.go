package palindrome

import (
	"errors"
	"strconv"
)

// Define Product type here.
type Product struct {
	palindrome     int
	Factorizations [][2]int
}

func Products(fmin, fmax int) (min Product, max Product, e error) {
	if fmin > fmax {
		return min, max, errors.New("fmin > fmax...")
	}
	var minProduct, maxProduct *Product
	for i := fmin; i <= fmax; i++ {
		for j := i; j <= fmax; j++ {
			candidate := i * j
			if isPalindrome(candidate) {
				factor := [2]int{i, j}
				if minProduct == nil || candidate < minProduct.palindrome {
					minProduct = &Product{palindrome: candidate, Factorizations: [][2]int{factor}}
				} else if candidate == minProduct.palindrome {
					minProduct.Factorizations = append(minProduct.Factorizations, factor)
				}
				if maxProduct == nil || candidate > maxProduct.palindrome {
					maxProduct = &Product{palindrome: candidate, Factorizations: [][2]int{factor}}
				} else if candidate == maxProduct.palindrome {
					maxProduct.Factorizations = append(maxProduct.Factorizations, factor)
				}
			}
		}
	}
	if minProduct == nil || maxProduct == nil {
		return min, max, errors.New("no palindromes...")
	}
	return *minProduct, *maxProduct, nil
}

func isPalindrome(x int) bool {
	str := strconv.Itoa(x)
	for i, j := 0, len(str)-1; i < j; i, j = i+1, j-1 {
		if str[i] != str[j] {
			return false
		}
	}
	return true
}