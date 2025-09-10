package palindrome

import (
	"fmt"
	"strconv"
)

type Product struct {
	Value          int
	Factorizations [][2]int
}

// Check if an integer is palindrome without string reversal
func isPalindrome(value int) bool {
	if value < 10 {
		return true
	}
	original, reversed := value, 0
	for value > 0 {
		reversed = reversed*10 + value%10
		value /= 10
	}
	return original == reversed
}

// Append to products slice if palindrome
func appendPalindromes(num1, num2 int, products map[int]*Product) {
	value := num1 * num2
	if isPalindrome(value) {
		if product, exists := products[value]; exists {
			// Check if factorization is unique
			for _, factor := range product.Factorizations {
				if (factor[0] == num1 && factor[1] == num2) || (factor[0] == num2 && factor[1] == num1) {
					return
				}
			}
			product.Factorizations = append(product.Factorizations, [2]int{num1, num2})
		} else {
			products[value] = &Product{
				Value:          value,
				Factorizations: [][2]int{{num1, num2}},
			}
		}
	}
}

// Get all products within a given range (inclusive)
func getProducts(fmin, fmax int) []Product {
	products := make(map[int]*Product)
	for num1 := fmin; num1 <= fmax; num1++ {
		for num2 := num1; num2 <= fmax; num2++ { // Avoid duplicate calculations
			appendPalindromes(num1, num2, products)
		}
	}
	result := make([]Product, 0, len(products))
	for _, product := range products {
		result = append(result, *product)
	}
	return result
}

// Find min and max products from the completed slice
func findMinAndMax(products []Product) (Product, Product) {
	minProduct, maxProduct := products[0], products[0]
	for _, product := range products {
		if product.Value < minProduct.Value {
			minProduct = product
		}
		if product.Value > maxProduct.Value {
			maxProduct = product
		}
	}
	return minProduct, maxProduct
}

// Main function called from test cases
func Products(fmin, fmax int) (Product, Product, error) {
	if fmax <= fmin {
		return Product{}, Product{}, fmt.Errorf("fmin > fmax")
	}
	palindromeProducts := getProducts(fmin, fmax)
	if len(palindromeProducts) == 0 {
		return Product{}, Product{}, fmt.Errorf("no palindromes")
	}
	minProduct, maxProduct := findMinAndMax(palindromeProducts)
	return minProduct, maxProduct, nil
}