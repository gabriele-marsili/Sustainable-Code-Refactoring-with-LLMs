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

// isPalindrome checks if an integer is a palindrome without string conversion for small numbers.
func isPalindrome(value int) bool {
	if value < 10 {
		return true
	}
	strValue := strconv.Itoa(value)
	for i := 0; i < len(strValue)/2; i++ {
		if strValue[i] != strValue[len(strValue)-i-1] {
			return false
		}
	}
	return true
}

// appendPalindrome efficiently appends palindrome products and their factorizations.
func appendPalindrome(num1, num2 int, products *[]Product, productMap map[int]*Product) {
	value := num1 * num2
	if isPalindrome(value) {
		if product, ok := productMap[value]; ok {
			// Check if the factorization already exists (or its reverse)
			exists := false
			for _, factorization := range product.Factorizations {
				if (factorization[0] == num1 && factorization[1] == num2) || (factorization[0] == num2 && factorization[1] == num1) {
					exists = true
					break
				}
			}
			if !exists {
				product.Factorizations = append(product.Factorizations, [2]int{num1, num2})
			}
		} else {
			// Create a new product
			newProduct := Product{
				Value:        value,
				Factorizations: [][2]int{{num1, num2}},
			}
			*products = append(*products, newProduct)
			productMap[value] = &(*products)[len(*products)-1] // Store pointer to avoid copy
		}
	}
}

// getProducts generates palindrome products within the given range.
func getProducts(fmin, fmax int) []Product {
	products := make([]Product, 0)
	productMap := make(map[int]*Product) // Use a map to efficiently check for existing products

	for num1 := fmin; num1 <= fmax; num1++ {
		for num2 := num1; num2 <= fmax; num2++ { // Start num2 from num1 to avoid duplicates and reduce computations
			appendPalindrome(num1, num2, &products, productMap)
		}
	}

	// Sort products by value to simplify min/max finding
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