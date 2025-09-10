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
	minPalindrome, maxPalindrome := -1, -1
	palindromeToFactors := make(map[int][][2]int)

	for i := fmin; i <= fmax; i++ {
		for j := i; j <= fmax; j++ {
			candidate := i * j
			if isPalindrome(candidate) {
				palindromeToFactors[candidate] = append(palindromeToFactors[candidate], [2]int{i, j})
				if minPalindrome == -1 || candidate < minPalindrome {
					minPalindrome = candidate
				}
				if candidate > maxPalindrome {
					maxPalindrome = candidate
				}
			}
		}
	}

	if len(palindromeToFactors) == 0 {
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
	str := strconv.Itoa(x)
	for i, j := 0, len(str)-1; i < j; i, j = i+1, j-1 {
		if str[i] != str[j] {
			return false
		}
	}
	return true
}