package palindrome

import (
	"errors"
	"sort"
	"strconv"
)

// Product holds a palindrome number and its factors
type Product struct {
	Product        int
	Factorizations [][2]int
}

/*Products finds the minimum and maximum palindrome products in a range of numbers
and checks that there is a palindrome and that the bonds are correct*/
func Products(fmin, fmax int) (Product, Product, error) {
	if fmax < fmin {
		return Product{}, Product{}, errors.New("fmin > fmax")
	}

	minPalindrome := Product{Product: -1}
	maxPalindrome := Product{Product: -1}

	for factorSmall := fmin; factorSmall <= fmax; factorSmall++ {
		for factorLarge := factorSmall; factorLarge <= fmax; factorLarge++ {
			product := factorSmall * factorLarge
			if isPalindromeInt(product) {
				if minPalindrome.Product == -1 {
					minPalindrome = Product{Product: product, Factorizations: [][2]int{{factorSmall, factorLarge}}}
					maxPalindrome = Product{Product: product, Factorizations: [][2]int{{factorSmall, factorLarge}}}
				} else if product < minPalindrome.Product {
					minPalindrome = Product{Product: product, Factorizations: [][2]int{{factorSmall, factorLarge}}}
				} else if product > maxPalindrome.Product {
					maxPalindrome = Product{Product: product, Factorizations: [][2]int{{factorSmall, factorLarge}}}
				} else if product == minPalindrome.Product {
					minPalindrome.Factorizations = append(minPalindrome.Factorizations, [][2]int{{factorSmall, factorLarge}})
				} else if product == maxPalindrome.Product {
					maxPalindrome.Factorizations = append(maxPalindrome.Factorizations, [][2]int{{factorSmall, factorLarge}})
				}
			}
		}
	}

	if minPalindrome.Product == -1 {
		return Product{}, Product{}, errors.New("No palindromes")
	}

	sortFactorizations(minPalindrome.Factorizations)
	sortFactorizations(maxPalindrome.Factorizations)

	return minPalindrome, maxPalindrome, nil
}

/*isPalindrome determines if a string is a palindrome*/
func isPalindrome(s string) bool {
	l := len(s)
	for i := 0; i < l/2; i++ {
		if s[i] != s[l-1-i] {
			return false
		}
	}
	return true
}

func isPalindromeInt(n int) bool {
	s := strconv.Itoa(n)
	l := len(s)
	for i := 0; i < l/2; i++ {
		if s[i] != s[l-1-i] {
			return false
		}
	}
	return true
}

func sortFactorizations(factorizations [][2]int) {
	sort.Slice(factorizations, func(i, j int) bool {
		if factorizations[i][0] != factorizations[j][0] {
			return factorizations[i][0] < factorizations[j][0]
		}
		return factorizations[i][1] < factorizations[j][1]
	})
}