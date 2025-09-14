package palindrome

import (
	"errors"
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
	var minPalindrome, maxPalindrome int
	found := false
	
	for i := fmin; i <= fmax; i++ {
		for j := i; j <= fmax; j++ {
			candidate := i * j
			if isPalindrome(candidate) {
				factor := [2]int{i, j}
				palindromeToFactors[candidate] = append(palindromeToFactors[candidate], factor)
				
				if !found {
					minPalindrome = candidate
					maxPalindrome = candidate
					found = true
				} else {
					if candidate < minPalindrome {
						minPalindrome = candidate
					}
					if candidate > maxPalindrome {
						maxPalindrome = candidate
					}
				}
			}
		}
	}
	
	if !found {
		// This error message doesn't conform to go-staticcheck but this problem expects this exact error string
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

func getProducts(min int, max int) (products []Product) {
	palindromeToFactors := getPalindromeToFactors(min, max)
	products = make([]Product, 0, len(palindromeToFactors))
	for palindrome, factors := range palindromeToFactors {
		product := Product{
			palindrome:     palindrome,
			Factorizations: factors,
		}
		products = append(products, product)
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
	for _, product := range products[1:] {
		if product.palindrome < min.palindrome {
			min = product
		}
	}
	return min
}

func getMax(products []Product) (max Product) {
	max = products[0]
	for _, product := range products[1:] {
		if product.palindrome > max.palindrome {
			max = product
		}
	}
	return max
}

func isPalindrome(x int) bool {
	if x < 0 {
		return false
	}
	
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