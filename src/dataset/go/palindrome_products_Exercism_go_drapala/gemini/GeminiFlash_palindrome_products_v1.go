package palindrome

import (
	"fmt"
	"sort"
	"strconv"
)

type Product struct {
	Value        int
	Factorizations [][2]int
}

// isPalindrome checks if an integer is a palindrome.
func isPalindrome(value int) bool {
	s := strconv.Itoa(value)
	for i := range s {
		if s[i] != s[len(s)-1-i] {
			return false
		}
	}
	return true
}

// appendPalindrome efficiently appends palindrome products and their factors.
func appendPalindrome(num1, num2 int, products *[]Product, productMap map[int]*Product) {
	value := num1 * num2
	if isPalindrome(value) {
		if product, ok := productMap[value]; ok {
			// Check for existing factorization
			exists := false
			for _, factor := range product.Factorizations {
				if (factor[0] == num1 && factor[1] == num2) || (factor[0] == num2 && factor[1] == num1) {
					exists = true
					break
				}
			}
			if !exists {
				product.Factorizations = append(product.Factorizations, [2]int{num1, num2})
			}
		} else {
			newProduct := Product{
				Value:        value,
				Factorizations: [][2]int{{num1, num2}},
			}
			*products = append(*products, newProduct)
			productMap[value] = &newProduct
		}
	}
}

// getProducts generates palindrome products within the given range.
func getProducts(fmin, fmax int) []Product {
	products := make([]Product, 0)
	productMap := make(map[int]*Product) // Use a map to efficiently track existing products

	for i := fmin; i <= fmax; i++ {
		for j := i; j <= fmax; j++ { // Start from i to avoid duplicate factorizations and reduce computations
			appendPalindrome(i, j, &products, productMap)
		}
	}

	// Sort products for consistent results and easier min/max finding
	sort.Slice(products, func(i, j int) bool {
		return products[i].Value < products[j].Value
	})

	return products
}

// Products finds the min and max palindrome products within the given range.
func Products(fmin, fmax int) (Product, Product, error) {
	if fmin > fmax {
		return Product{}, Product{}, fmt.Errorf("fmin > fmax")
	}

	palindromeProducts := getProducts(fmin, fmax)

	if len(palindromeProducts) == 0 {
		return Product{}, Product{}, fmt.Errorf("no palindromes")
	}

	minProduct := palindromeProducts[0]
	maxProduct := palindromeProducts[len(palindromeProducts)-1]

	return minProduct, maxProduct, nil
}