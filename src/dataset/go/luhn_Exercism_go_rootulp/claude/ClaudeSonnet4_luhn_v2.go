package luhn

// Valid returns whether the provided string represents a number that satisfies the Luhn algorithm.
func Valid(s string) bool {
	// Remove spaces and validate length in one pass
	cleaned := make([]byte, 0, len(s))
	for i := 0; i < len(s); i++ {
		if s[i] != ' ' {
			cleaned = append(cleaned, s[i])
		}
	}
	
	if len(cleaned) <= 1 {
		return false
	}
	
	sum := 0
	isEven := true
	
	// Process digits from right to left without reversing
	for i := len(cleaned) - 1; i >= 0; i-- {
		digit := cleaned[i]
		
		// Check if character is a digit
		if digit < '0' || digit > '9' {
			return false
		}
		
		n := int(digit - '0')
		
		if isEven {
			sum += n
		} else {
			doubled := n * 2
			if doubled > 9 {
				doubled -= 9
			}
			sum += doubled
		}
		isEven = !isEven
	}
	
	return sum%10 == 0
}