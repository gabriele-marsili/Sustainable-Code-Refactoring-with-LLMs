package palindrome

import (
	"errors"
)

type Product struct {
	Product        int
	Factorizations [][2]int
}

func Products(fmin, fmax int) (Product, Product, error) {
	if fmax < fmin {
		return Product{}, Product{}, errors.New("fmin > fmax")
	}
	
	palindromes := make(map[int][][2]int)
	minPalindrome := -1
	maxPalindrome := -1
	
	for factorSmall := fmin; factorSmall <= fmax; factorSmall++ {
		for factorLarge := factorSmall; factorLarge <= fmax; factorLarge++ {
			product := factorSmall * factorLarge
			if isPalindrome(product) {
				if _, exists := palindromes[product]; !exists {
					palindromes[product] = make([][2]int, 0, 1)
				}
				palindromes[product] = append(palindromes[product], [2]int{factorSmall, factorLarge})
				
				if minPalindrome == -1 || product < minPalindrome {
					minPalindrome = product
				}
				if maxPalindrome == -1 || product > maxPalindrome {
					maxPalindrome = product
				}
			}
		}
	}
	
	if len(palindromes) == 0 {
		return Product{}, Product{}, errors.New("No palindromes")
	}
	
	minProduct := Product{minPalindrome, palindromes[minPalindrome]}
	maxProduct := Product{maxPalindrome, palindromes[maxPalindrome]}
	
	return minProduct, maxProduct, nil
}

func isPalindrome(n int) bool {
	if n < 0 {
		return false
	}
	
	original := n
	reversed := 0
	
	for n > 0 {
		reversed = reversed*10 + n%10
		n /= 10
	}
	
	return original == reversed
}

func insert(list []Product, p Product) []Product {
	for i := 0; i < len(list); i++ {
		if p.Product < list[i].Product {
			return append(list[:i], append([]Product{p}, list[i:]...)...)
		} else if list[i].Product == p.Product {
			list[i].Factorizations = append(list[i].Factorizations, p.Factorizations...)
			return list
		}
	}
	return append(list, p)
}