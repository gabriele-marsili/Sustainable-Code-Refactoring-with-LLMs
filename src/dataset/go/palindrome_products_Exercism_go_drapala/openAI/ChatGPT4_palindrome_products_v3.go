package palindrome

import (
	"fmt"
	"strconv"
)

type Product struct {
	Value          int
	Factorizations [][2]int
}

func ProductIndex(value int, products []Product) int {
	for i := range products {
		if products[i].Value == value {
			return i
		}
	}
	return -1
}

func FactorInArray(factors [][2]int, num1, num2 int) bool {
	for _, factor := range factors {
		if factor[0] == num2 && factor[1] == num1 {
			return true
		}
	}
	return false
}

func appendPalindromes(num1, num2 int, products *[]Product) {
	value := num1 * num2
	if isPalindrome(value) {
		existingIndex := ProductIndex(value, *products)
		if existingIndex != -1 {
			if !FactorInArray((*products)[existingIndex].Factorizations, num1, num2) {
				(*products)[existingIndex].Factorizations = append((*products)[existingIndex].Factorizations, [2]int{num1, num2})
			}
		} else {
			*products = append(*products, Product{
				Value:          value,
				Factorizations: [][2]int{{num1, num2}},
			})
		}
	}
}

func getProducts(fmin, fmax int) []Product {
	products := make([]Product, 0)
	for num1 := fmin; num1 <= fmax; num1++ {
		for num2 := num1; num2 <= fmax; num2++ {
			appendPalindromes(num1, num2, &products)
		}
	}
	return products
}

func reverseString(input string) string {
	runes := []rune(input)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}

func isPalindrome(value int) bool {
	if value < 10 {
		return true
	}
	valueStr := strconv.Itoa(value)
	return valueStr == reverseString(valueStr)
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
	if len(palindromeProducts) != 0 {
		minProduct, maxProduct := findMinAndMax(palindromeProducts)
		return minProduct, maxProduct, nil
	}
	return Product{}, Product{}, fmt.Errorf("no palindromes")
}