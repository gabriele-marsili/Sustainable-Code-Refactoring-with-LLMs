package palindrome

import (
	"errors"
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
	
	palindromeToFactors := make(map[int][][2]int)
	var minPalindrome, maxPalindrome int
	found := false
	
	for i := fmin; i <= fmax; i++ {
		for j := i; j <= fmax; j++ {
			candidate := i * j
			if isPalindrome(candidate) {
				factor := [2]int{i, j}
				palindromeToFactors[candidate] = append(palindromeToFactors[candidate], factor)
				
				if !found {
					minPalindrome = candidate
					maxPalindrome = candidate
					found = true
				} else {
					if candidate < minPalindrome {
						minPalindrome = candidate
					}
					if candidate > maxPalindrome {
						maxPalindrome = candidate
					}
				}
			}
		}
	}
	
	if !found {
		// This error message doesn't conform to go-staticcheck but this problem expects this exact error string
		return min, max, errors.New("no palindromes...")
	}
	
	min = Product{
		palindrome:     minPalindrome,
		Factorizations: palindromeToFactors[minPalindrome],
	}
	max = Product{
		palindrome:     maxPalindrome,
		Factorizations: palindromeToFactors[maxPalindrome],
	}
	
	return min, max, nil
}

func isPalindrome(x int) bool {
	if x < 0 {
		return false
	}
	
	original := x
	reversed := 0
	
	for x > 0 {
		reversed = reversed*10 + x%10
		x /= 10
	}
	
	return original == reversed
}