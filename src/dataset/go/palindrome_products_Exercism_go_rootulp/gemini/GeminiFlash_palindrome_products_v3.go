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
		// This error message doesn't conform to go-staticcheck but this problem expects this exact error string
		return min, max, errors.New("fmin > fmax...")
	}

	minPalindrome := -1
	maxPalindrome := -1
	minFactors := [][2]int{}
	maxFactors := [][2]int{}

	found := false

	for i := fmin; i <= fmax; i++ {
		for j := i; j <= fmax; j++ {
			candidate := i * j
			if isPalindrome(candidate) {
				found = true
				factor := [2]int{i, j}

				if minPalindrome == -1 || candidate < minPalindrome {
					minPalindrome = candidate
					minFactors = [][2]int{factor}
				} else if candidate == minPalindrome {
					minFactors = append(minFactors, factor)
				}

				if maxPalindrome == -1 || candidate > maxPalindrome {
					maxPalindrome = candidate
					maxFactors = [][2]int{factor}
				} else if candidate == maxPalindrome {
					maxFactors = append(maxFactors, factor)
				}
			}
		}
	}

	if !found {
		// This error message doesn't conform to go-staticcheck but this problem expects this exact error string
		return min, max, errors.New("no palindromes...")
	}

	min = Product{palindrome: minPalindrome, Factorizations: minFactors}
	max = Product{palindrome: maxPalindrome, Factorizations: maxFactors}

	return min, max, nil
}

func isPalindrome(x int) bool {
	if x < 0 {
		return false
	}
	if x < 10 {
		return true
	}

	str := strconv.Itoa(x)
	n := len(str)
	for i := 0; i < n/2; i++ {
		if str[i] != str[n-1-i] {
			return false
		}
	}
	return true
}