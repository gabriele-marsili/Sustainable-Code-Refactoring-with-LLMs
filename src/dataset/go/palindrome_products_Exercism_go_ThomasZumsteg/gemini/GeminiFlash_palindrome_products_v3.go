package palindrome

import (
	"errors"
	"sort"
	"strconv"
)

//Product holds a palindrome number and its factors
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
			if isPalindrome(strconv.Itoa(product)) {
				if minPalindrome.Product == -1 {
					minPalindrome = Product{Product: product, Factorizations: [][2]int{{factorSmall, factorLarge}}}
				} else if product < minPalindrome.Product {
					minPalindrome = Product{Product: product, Factorizations: [][2]int{{factorSmall, factorLarge}}}
				} else if product == minPalindrome.Product {
					minPalindrome.Factorizations = append(minPalindrome.Factorizations, [2]int{factorSmall, factorLarge})
				}

				if maxPalindrome.Product == -1 {
					maxPalindrome = Product{Product: product, Factorizations: [][2]int{{factorSmall, factorLarge}}}
				} else if product > maxPalindrome.Product {
					maxPalindrome = Product{Product: product, Factorizations: [][2]int{{factorSmall, factorLarge}}}
				} else if product == maxPalindrome.Product {
					maxPalindrome.Factorizations = append(maxPalindrome.Factorizations, [2]int{factorSmall, factorLarge})
				}
			}
		}
	}

	if minPalindrome.Product == -1 {
		return Product{}, Product{}, errors.New("No palindromes")
	}

	return minPalindrome, maxPalindrome, nil
}

/*isPalindrome determines if a string is a palindrome*/
func isPalindrome(s string) bool {
	for i := 0; i < len(s)/2; i++ {
		if s[i] != s[len(s)-i-1] {
			return false
		}
	}
	return true
}

/*insert adds a palindrome number into a sorted list of palindrome number*/
func insert(list []Product, p Product) []Product {
	i := sort.Search(len(list), func(i int) bool { return list[i].Product >= p.Product })
	if i < len(list) && list[i].Product == p.Product {
		list[i].Factorizations = append(list[i].Factorizations, p.Factorizations...)
		return list
	}
	list = append(list, Product{})
	copy(list[i+1:], list[i:])
	list[i] = p
	return list
}