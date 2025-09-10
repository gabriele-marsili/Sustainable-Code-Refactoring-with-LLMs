package palindrome

import (
	"fmt"
	"strconv"
)

type Product struct {
	Value          int
	Factorizations [][2]int
}

func ProductIndex(value int, products map[int]*Product) *Product {
	if product, exists := products[value]; exists {
		return product
	}
	return nil
}

func appendPalindromes(num1, num2 int, products map[int]*Product) {
	value := num1 * num2
	if isPalindrome(value) {
		if product := ProductIndex(value, products); product != nil {
			product.Factorizations = append(product.Factorizations, [2]int{num1, num2})
		} else {
			products[value] = &Product{
				Value:          value,
				Factorizations: [][2]int{{num1, num2}},
			}
		}
	}
}

func getProducts(fmin, fmax int) []Product {
	products := make(map[int]*Product)
	for num1 := fmin; num1 <= fmax; num1++ {
		for num2 := num1; num2 <= fmax; num2++ {
			appendPalindromes(num1, num2, products)
		}
	}
	result := make([]Product, 0, len(products))
	for _, product := range products {
		result = append(result, *product)
	}
	return result
}

func isPalindrome(value int) bool {
	if value < 10 {
		return true
	}
	str := strconv.Itoa(value)
	for i, j := 0, len(str)-1; i < j; i, j = i+1, j-1 {
		if str[i] != str[j] {
			return false
		}
	}
	return true
}

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