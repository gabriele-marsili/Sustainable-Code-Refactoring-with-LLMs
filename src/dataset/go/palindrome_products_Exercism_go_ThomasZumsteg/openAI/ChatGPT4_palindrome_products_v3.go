package palindrome

import (
	"errors"
	"strconv"
)

type Product struct {
	Product        int
	Factorizations [][2]int
}

func Products(fmin, fmax int) (Product, Product, error) {
	if fmax < fmin {
		return Product{}, Product{}, errors.New("fmin > fmax")
	}
	var minProduct, maxProduct *Product
	for factorSmall := fmin; factorSmall <= fmax; factorSmall++ {
		for factorLarge := factorSmall; factorLarge <= fmax; factorLarge++ {
			product := factorSmall * factorLarge
			if isPalindrome(strconv.Itoa(product)) {
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

func isPalindrome(s string) bool {
	for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
		if s[i] != s[j] {
			return false
		}
	}
	return true
}