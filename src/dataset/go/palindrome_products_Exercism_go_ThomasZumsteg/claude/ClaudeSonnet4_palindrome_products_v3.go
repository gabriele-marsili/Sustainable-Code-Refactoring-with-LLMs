package palindrome

import (
	"errors"
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
	
	palindromeMap := make(map[int][][2]int)
	
	for factorSmall := fmin; factorSmall <= fmax; factorSmall++ {
		for factorLarge := factorSmall; factorLarge <= fmax; factorLarge++ {
			product := factorSmall * factorLarge
			if isPalindrome(product) {
				palindromeMap[product] = append(palindromeMap[product], [2]int{factorSmall, factorLarge})
			}
		}
	}
	
	if len(palindromeMap) == 0 {
		return Product{}, Product{}, errors.New("No palindromes")
	}
	
	var minProduct, maxProduct int
	first := true
	for product := range palindromeMap {
		if first {
			minProduct = product
			maxProduct = product
			first = false
		} else {
			if product < minProduct {
				minProduct = product
			}
			if product > maxProduct {
				maxProduct = product
			}
		}
	}
	
	return Product{minProduct, palindromeMap[minProduct]}, 
		   Product{maxProduct, palindromeMap[maxProduct]}, nil
}

/*isPalindrome determines if a number is a palindrome*/
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

/*insert adds a palindrome number into a sorted list of palindrome number*/
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