package palindrome

import (
	"errors"
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

	var minProduct, maxProduct *Product
	for factorSmall := fmin; factorSmall <= fmax; factorSmall++ {
		for factorLarge := factorSmall; factorLarge <= fmax; factorLarge++ {
			product := factorSmall * factorLarge
			if isPalindromeInt(product) {
				if minProduct == nil || product < minProduct.Product {
					minProduct = &Product{Product: product, Factorizations: [][2]int{{factorSmall, factorLarge}}}
				} else if product == minProduct.Product {
					minProduct.Factorizations = append(minProduct.Factorizations, [2]int{factorSmall, factorLarge})
				}

				if maxProduct == nil || product > maxProduct.Product {
					maxProduct = &Product{Product: product, Factorizations: [][2]int{{factorSmall, factorLarge}}}
				} else if product == maxProduct.Product {
					maxProduct.Factorizations = append(maxProduct.Factorizations, [2]int{factorSmall, factorLarge})
				}
			}
		}
	}

	if minProduct == nil || maxProduct == nil {
		return Product{}, Product{}, errors.New("No palindromes")
	}

	return *minProduct, *maxProduct, nil
}

/*isPalindromeInt determines if an integer is a palindrome*/
func isPalindromeInt(n int) bool {
	s := strconv.Itoa(n)
	l := len(s) - 1
	for i := 0; i <= l/2; i++ {
		if s[i] != s[l-i] {
			return false
		}
	}
	return true
}