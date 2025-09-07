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
		
		digitValue := int(digit - '0')
		
		if isEven {
			sum += digitValue
		} else {
			doubled := digitValue * 2
			if doubled > 9 {
				doubled -= 9
			}
			sum += doubled
		}
		isEven = !isEven
	}
	
	return sum%10 == 0
}

// checkSum returns the Luhn check sum of the provided string.
func checkSum(s string) (int, error) {
	sum := 0
	isEven := true
	
	for i := len(s) - 1; i >= 0; i-- {
		digit := s[i]
		
		if digit < '0' || digit > '9' {
			return 0, errors.New("Invalid digit")
		}
		
		digitValue := int(digit - '0')
		
		if isEven {
			sum += digitValue
		} else {
			doubled := digitValue * 2
			if doubled > 9 {
				doubled -= 9
			}
			sum += doubled
		}
		isEven = !isEven
	}
	
	return sum, nil
}

// reverse returns a string with characters in reversed order.
func reverse(s string) string {
	if len(s) <= 1 {
		return s
	}
	
	runes := []rune(s)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	
	return string(runes)
}