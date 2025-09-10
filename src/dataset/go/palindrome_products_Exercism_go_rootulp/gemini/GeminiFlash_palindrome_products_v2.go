package palindrome

import (
	"errors"
	"sort"
	"strconv"
)

// Define Product type here.
type Product struct {
	palindrome     int
	Factorizations [][2]int
}

func Products(fmin, fmax int) (min Product, max Product, e error) {
	if fmin > fmax {
		return min, max, errors.New("fmin > fmax...")
	}

	palindromeToFactors := make(map[int][][2]int)
	minPalindrome := -1
	maxPalindrome := -1

	for i := fmin; i <= fmax; i++ {
		for j := i; j <= fmax; j++ {
			candidate := i * j
			if isPalindrome(candidate) {
				factor := [2]int{i, j}
				if _, ok := palindromeToFactors[candidate]; ok {
					palindromeToFactors[candidate] = append(palindromeToFactors[candidate], factor)
				} else {
					palindromeToFactors[candidate] = [][2]int{factor}
					if minPalindrome == -1 || candidate < minPalindrome {
						minPalindrome = candidate
					}
					if maxPalindrome == -1 || candidate > maxPalindrome {
						maxPalindrome = candidate
					}
				}
			}
		}
	}

	if len(palindromeToFactors) == 0 {
		return min, max, errors.New("no palindromes...")
	}

	min = Product{palindrome: minPalindrome, Factorizations: palindromeToFactors[minPalindrome]}
	max = Product{palindrome: maxPalindrome, Factorizations: palindromeToFactors[maxPalindrome]}

	return min, max, nil
}

func isPalindrome(x int) bool {
	s := strconv.Itoa(x)
	n := len(s)
	for i := 0; i < n/2; i++ {
		if s[i] != s[n-1-i] {
			return false
		}
	}
	return true
}

func reverse(s string) string {
	runes := []rune(s)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}

func getMin(products []Product) (min Product) {
	if len(products) == 0 {
		return
	}
	min = products[0]
	for _, product := range products {
		if product.palindrome < min.palindrome {
			min = product
		}
	}
	return min
}

func getMax(products []Product) (max Product) {
	if len(products) == 0 {
		return
	}
	max = products[0]
	for _, product := range products {
		if product.palindrome > max.palindrome {
			max = product
		}
	}
	return max
}

func getProducts(min int, max int) (products []Product) {
	palindromeToFactors := getPalindromeToFactors(min, max)
	for palindrome, factors := range palindromeToFactors {
		product := Product{
			palindrome:     palindrome,
			Factorizations: factors,
		}
		products = append(products, product)
	}
	sort.Slice(products, func(i, j int) bool {
		return products[i].palindrome < products[j].palindrome
	})
	return products
}

func getPalindromeToFactors(min int, max int) (palindromeToFactors map[int][][2]int) {
	palindromeToFactors = make(map[int][][2]int)
	for i := min; i <= max; i++ {
		for j := i; j <= max; j++ {
			candidate := i * j
			factor := [2]int{i, j}
			if isPalindrome(candidate) {
				if factors, ok := palindromeToFactors[candidate]; ok {
					factors = append(factors, factor)
					palindromeToFactors[candidate] = factors
				} else {
					palindromeToFactors[candidate] = [][2]int{factor}
				}
			}
		}
	}
	return palindromeToFactors
}