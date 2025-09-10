package palindrome

import (
	"errors"
	"sort"
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

	palindromeToFactors := make(map[int][][2]int)
	minPalindrome := -1
	maxPalindrome := -1

	for i := fmin; i <= fmax; i++ {
		for j := i; j <= fmax; j++ {
			candidate := i * j
			if isPalindrome(candidate) {
				factor := [2]int{i, j}
				if _, ok := palindromeToFactors[candidate]; ok {
					palindromeToFactors[candidate] = append(palindromeToFactors[candidate], factor)
				} else {
					palindromeToFactors[candidate] = [][2]int{factor}
				}

				if minPalindrome == -1 || candidate < minPalindrome {
					minPalindrome = candidate
				}
				if maxPalindrome == -1 || candidate > maxPalindrome {
					maxPalindrome = candidate
				}
			}
		}
	}

	if len(palindromeToFactors) == 0 {
		// This error message doesn't conform to go-staticcheck but this problem expects this exact error string
		return min, max, errors.New("no palindromes...")
	}

	min = Product{palindrome: minPalindrome, Factorizations: palindromeToFactors[minPalindrome]}
	max = Product{palindrome: maxPalindrome, Factorizations: palindromeToFactors[maxPalindrome]}

	return min, max, nil
}

func isPalindrome(x int) bool {
	s := strconv.Itoa(x)
	n := len(s)
	for i := 0; i < n/2; i++ {
		if s[i] != s[n-1-i] {
			return false
		}
	}
	return true
}

func sortProducts(products []Product) {
	sort.Slice(products, func(i, j int) bool {
		return products[i].palindrome < products[j].palindrome
	})
}