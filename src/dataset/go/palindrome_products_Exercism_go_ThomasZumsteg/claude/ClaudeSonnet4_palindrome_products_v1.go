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
	
	palindromes := make(map[int][][2]int)
	var sortedKeys []int
	
	for factorSmall := fmin; factorSmall <= fmax; factorSmall++ {
		for factorLarge := factorSmall; factorLarge <= fmax; factorLarge++ {
			product := factorSmall * factorLarge
			if isPalindromeInt(product) {
				if _, exists := palindromes[product]; !exists {
					sortedKeys = insertSorted(sortedKeys, product)
				}
				palindromes[product] = append(palindromes[product], [2]int{factorSmall, factorLarge})
			}
		}
	}
	
	if len(sortedKeys) == 0 {
		return Product{}, Product{}, errors.New("No palindromes")
	}
	
	minKey := sortedKeys[0]
	maxKey := sortedKeys[len(sortedKeys)-1]
	
	return Product{minKey, palindromes[minKey]}, Product{maxKey, palindromes[maxKey]}, nil
}

/*isPalindromeInt determines if an integer is a palindrome without string conversion*/
func isPalindromeInt(n int) bool {
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

/*insertSorted inserts a value into a sorted slice maintaining order*/
func insertSorted(slice []int, value int) []int {
	i := 0
	for i < len(slice) && slice[i] < value {
		i++
	}
	
	if i < len(slice) && slice[i] == value {
		return slice
	}
	
	slice = append(slice, 0)
	copy(slice[i+1:], slice[i:])
	slice[i] = value
	return slice
}

/*isPalindrome determines if a string is a palindrome*/
func isPalindrome(s string) bool {
	l := len(s) - 1
	for i := 0; i < l-i; i++ {
		if s[i] != s[l-i] {
			return false
		}
	}
	return true
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