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
	for i, product := range products {
		if product.Value == value {
			return i
		}
	}
	return -1
}

func FactorInArray(factors [][2]int, num1, num2 int) bool {
	target := [2]int{num2, num1}
	for _, factor := range factors {
		if target == factor {
			return true
		}
	}
	return false
}

func appendPalindromes(num1, num2 int, products *[]Product, productMap map[int]int) {
	value := num1 * num2
	if isPalindrome(value) {
		if existingIndex, exists := productMap[value]; exists {
			if !FactorInArray((*products)[existingIndex].Factorizations, num1, num2) {
				(*products)[existingIndex].Factorizations = append((*products)[existingIndex].Factorizations, [2]int{num1, num2})
			}
		} else {
			product := Product{
				Value:          value,
				Factorizations: [][2]int{{num1, num2}},
			}
			*products = append(*products, product)
			productMap[value] = len(*products) - 1
		}
	}
}

func getProducts(fmin, fmax int) []Product {
	estimatedSize := (fmax - fmin + 1) * (fmax - fmin + 1) / 10
	products := make([]Product, 0, estimatedSize)
	productMap := make(map[int]int, estimatedSize)
	
	for num1 := fmin; num1 <= fmax; num1++ {
		for num2 := num1; num2 <= fmax; num2++ {
			appendPalindromes(num1, num2, &products, productMap)
			if num1 != num2 {
				appendPalindromes(num2, num1, &products, productMap)
			}
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
	valueString := strconv.Itoa(value)
	return valueString == reverseString(valueString)
}

func findMinAndMax(products []Product) (Product, Product, error) {
	if len(products) == 0 {
		return Product{}, Product{}, fmt.Errorf("no palindromes")
	}
	
	minProduct := products[0]
	maxProduct := products[0]
	
	for _, product := range products {
		if product.Value < minProduct.Value {
			minProduct = product
		}
		if product.Value > maxProduct.Value {
			maxProduct = product
		}
	}
	return minProduct, maxProduct, nil
}

func Products(fmin, fmax int) (Product, Product, error) {
	if fmax <= fmin {
		return Product{}, Product{}, fmt.Errorf("fmin > fmax")
	}
	
	palindromeProducts := getProducts(fmin, fmax)
	return findMinAndMax(palindromeProducts)
}