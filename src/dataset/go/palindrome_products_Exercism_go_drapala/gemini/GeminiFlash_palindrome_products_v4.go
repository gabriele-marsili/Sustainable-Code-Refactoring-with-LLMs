package palindrome

import (
	"fmt"
	"strconv"
	"sync"
)

type Product struct {
	Value        int
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
	for _, factor := range factors {
		if factor[0] == num2 && factor[1] == num1 {
			return true
		}
	}
	return false
}

func appendPalindromes(num1, num2 int, products *[]Product, mu *sync.Mutex) {
	value := num1 * num2
	if isPalindrome(value) {
		existingIndex := ProductIndex(value, *products)
		mu.Lock()
		if existingIndex != -1 {
			if !FactorInArray((*products)[existingIndex].Factorizations, num1, num2) {
				(*products)[existingIndex].Factorizations = append((*products)[existingIndex].Factorizations, [2]int{num1, num2})
			}
		} else {
			product := Product{
				Value:        value,
				Factorizations: [][2]int{{num1, num2}},
			}
			*products = append(*products, product)
		}
		mu.Unlock()
	}
}

func getProducts(fmin, fmax int) []Product {
	products := make([]Product, 0)
	var wg sync.WaitGroup
	var mu sync.Mutex

	for num1 := fmin; num1 <= fmax; num1++ {
		wg.Add(1)
		go func(n1 int) {
			defer wg.Done()
			for num2 := n1; num2 <= fmax; num2++ {
				appendPalindromes(n1, num2, &products, &mu)
			}
		}(num1)
	}
	wg.Wait()
	return products
}

func isPalindrome(value int) bool {
	if value < 10 {
		return true
	}
	s := strconv.Itoa(value)
	for i := range s {
		if s[i] != s[len(s)-1-i] {
			return false
		}
	}
	return true
}

func findMinAndMax(products []Product) (Product, Product) {
	if len(products) == 0 {
		return Product{}, Product{}
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
	return minProduct, maxProduct
}

func Products(fmin, fmax int) (Product, Product, error) {
	if fmax < fmin {
		return Product{}, Product{}, fmt.Errorf("fmin > fmax")
	}

	palindromeProducts := getProducts(fmin, fmax)

	if len(palindromeProducts) > 0 {
		minProduct, maxProduct := findMinAndMax(palindromeProducts)
		return minProduct, maxProduct, nil
	}

	return Product{}, Product{}, fmt.Errorf("no palindromes")
}