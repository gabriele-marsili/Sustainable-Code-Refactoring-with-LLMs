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
	products := getProducts(fmin, fmax)
	if len(products) == 0 {
		// This error message doesn't conform to go-staticcheck but this problem expects this exact error string
		return min, max, errors.New("no palindromes...")
	}
	return getMin(products), getMax(products), nil
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