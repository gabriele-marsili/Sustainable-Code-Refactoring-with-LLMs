package palindrome

import (
	"fmt"
	"strconv"
)

type Product struct {
	Value   int
	Factorizations [][2]int // An array of 2-length-arrays of ints
}

// Check if an integer is palindrome via numeric reversal
func isPalindrome(value int) bool {
	if value < 10 {
		return true
	}
	original := value
	reversed := 0
	for value > 0 {
		reversed = reversed*10 + value%10
		value /= 10
	}
	return original == reversed
}

// Main function called from test cases
func Products(fmin, fmax int) (Product, Product, error) {
	// Error handling
	if fmax <= fmin {
		return Product{}, Product{}, fmt.Errorf("fmin > fmax")
	}
	
	productMap := make(map[int][][2]int)
	var minVal, maxVal int = -1, -1
	
	// Generate products and track palindromes
	for num1 := fmin; num1 <= fmax; num1++ {
		for num2 := num1; num2 <= fmax; num2++ { // Start from num1 to avoid duplicates
			value := num1 * num2
			if isPalindrome(value) {
				if minVal == -1 || value < minVal {
					minVal = value
				}
				if maxVal == -1 || value > maxVal {
					maxVal = value
				}
				
				// Add factorization
				if factors, exists := productMap[value]; exists {
					// Check if this factorization already exists
					found := false
					for _, factor := range factors {
						if (factor[0] == num1 && factor[1] == num2) || (factor[0] == num2 && factor[1] == num1) {
							found = true
							break
						}
					}
					if !found {
						productMap[value] = append(factors, [2]int{num1, num2})
					}
				} else {
					productMap[value] = [][2]int{{num1, num2}}
				}
				
				// If num1 != num2, also add the reverse factorization
				if num1 != num2 {
					found := false
					for _, factor := range productMap[value] {
						if factor[0] == num2 && factor[1] == num1 {
							found = true
							break
						}
					}
					if !found {
						productMap[value] = append(productMap[value], [2]int{num2, num1})
					}
				}
			}
		}
	}
	
	if len(productMap) == 0 {
		return Product{}, Product{}, fmt.Errorf("no palindromes")
	}
	
	minProduct := Product{Value: minVal, Factorizations: productMap[minVal]}
	maxProduct := Product{Value: maxVal, Factorizations: productMap[maxVal]}
	
	return minProduct, maxProduct, nil
}