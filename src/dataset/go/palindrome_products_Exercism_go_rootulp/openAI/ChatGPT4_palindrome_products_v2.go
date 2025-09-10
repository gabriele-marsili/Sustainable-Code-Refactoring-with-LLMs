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
	var minPalindrome, maxPalindrome *Product
	for i := fmin; i <= fmax; i++ {
		for j := i; j <= fmax; j++ {
			candidate := i * j
			if isPalindrome(candidate) {
				factor := [2]int{i, j}
				if minPalindrome == nil || candidate < minPalindrome.palindrome {
					minPalindrome = &Product{palindrome: candidate, Factorizations: [][2]int{factor}}
				} else if candidate == minPalindrome.palindrome {
					minPalindrome.Factorizations = append(minPalindrome.Factorizations, factor)
				}
				if maxPalindrome == nil || candidate > maxPalindrome.palindrome {
					maxPalindrome = &Product{palindrome: candidate, Factorizations: [][2]int{factor}}
				} else if candidate == maxPalindrome.palindrome {
					maxPalindrome.Factorizations = append(maxPalindrome.Factorizations, factor)
				}
			}
		}
	}
	if minPalindrome == nil || maxPalindrome == nil {
		return min, max, errors.New("no palindromes...")
	}
	return *minPalindrome, *maxPalindrome, nil
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