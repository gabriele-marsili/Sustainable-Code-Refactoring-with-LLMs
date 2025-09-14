package palindrome

import (
	"errors"
)

type Product struct {
	palindrome     int
	Factorizations [][2]int
}

func Products(fmin, fmax int) (min Product, max Product, e error) {
	if fmin > fmax {
		return min, max, errors.New("fmin > fmax...")
	}
	
	palindromeToFactors := make(map[int][][2]int)
	
	for i := fmin; i <= fmax; i++ {
		for j := i; j <= fmax; j++ {
			candidate := i * j
			if isPalindrome(candidate) {
				factor := [2]int{i, j}
				palindromeToFactors[candidate] = append(palindromeToFactors[candidate], factor)
			}
		}
	}
	
	if len(palindromeToFactors) == 0 {
		return min, max, errors.New("no palindromes...")
	}
	
	minPalindrome := -1
	maxPalindrome := -1
	
	for palindrome := range palindromeToFactors {
		if minPalindrome == -1 || palindrome < minPalindrome {
			minPalindrome = palindrome
		}
		if maxPalindrome == -1 || palindrome > maxPalindrome {
			maxPalindrome = palindrome
		}
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

func getProducts(min int, max int) (products []Product) {
	palindromeToFactors := getPalindromeToFactors(min, max)
	products = make([]Product, 0, len(palindromeToFactors))
	for palindrome, factors := range palindromeToFactors {
		products = append(products, Product{
			palindrome:     palindrome,
			Factorizations: factors,
		})
	}
	return products
}

func getPalindromeToFactors(min int, max int) (palindromeToFactors map[int][][2]int) {
	palindromeToFactors = make(map[int][][2]int)
	for i := min; i <= max; i++ {
		for j := i; j <= max; j++ {
			candidate := i * j
			if isPalindrome(candidate) {
				factor := [2]int{i, j}
				palindromeToFactors[candidate] = append(palindromeToFactors[candidate], factor)
			}
		}
	}
	return palindromeToFactors
}

func getMin(products []Product) (min Product) {
	min = products[0]
	for i := 1; i < len(products); i++ {
		if products[i].palindrome < min.palindrome {
			min = products[i]
		}
	}
	return min
}

func getMax(products []Product) (max Product) {
	max = products[0]
	for i := 1; i < len(products); i++ {
		if products[i].palindrome > max.palindrome {
			max = products[i]
		}
	}
	return max
}

func isPalindrome(x int) bool {
	original := x
	reversed := 0
	
	for x > 0 {
		reversed = reversed*10 + x%10
		x /= 10
	}
	
	return original == reversed
}

func reverse(original string) (reversed string) {
	runes := []rune(original)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}