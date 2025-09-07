package luhn

// Valid returns whether the provided string represents a number that satisfies the Luhn algorithm.
func Valid(s string) bool {
	// Remove spaces and validate length in one pass
	digitCount := 0
	for i := 0; i < len(s); i++ {
		if s[i] != ' ' {
			digitCount++
		}
	}
	
	if digitCount <= 1 {
		return false
	}

	sum := 0
	isSecond := false
	
	// Process string from right to left without creating new strings
	for i := len(s) - 1; i >= 0; i-- {
		char := s[i]
		
		if char == ' ' {
			continue
		}
		
		// Check if character is a digit
		if char < '0' || char > '9' {
			return false
		}
		
		digit := int(char - '0')
		
		if isSecond {
			digit *= 2
			if digit > 9 {
				digit -= 9
			}
		}
		
		sum += digit
		isSecond = !isSecond
	}
	
	return sum%10 == 0
}