package luhn

// Valid returns whether the provided string represents a number that satisfies the Luhn algorithm.
func Valid(s string) bool {
	if len(s) <= 1 {
		return false
	}
	
	sum := 0
	digitCount := 0
	isEven := true
	
	for i := len(s) - 1; i >= 0; i-- {
		char := s[i]
		
		if char == ' ' {
			continue
		}
		
		if char < '0' || char > '9' {
			return false
		}
		
		digit := int(char - '0')
		
		if isEven {
			sum += digit
		} else {
			doubled := digit * 2
			if doubled > 9 {
				doubled -= 9
			}
			sum += doubled
		}
		
		isEven = !isEven
		digitCount++
	}
	
	return digitCount > 1 && sum%10 == 0
}

// checkSum returns the Luhn check sum of the provided string.
func checkSum(s string) (int, error) {
	sum := 0
	digitCount := 0
	isEven := true
	
	for i := len(s) - 1; i >= 0; i-- {
		char := s[i]
		
		if char < '0' || char > '9' {
			return 0, errors.New("Invalid digit")
		}
		
		digit := int(char - '0')
		
		if isEven {
			sum += digit
		} else {
			doubled := digit * 2
			if doubled > 9 {
				doubled -= 9
			}
			sum += doubled
		}
		
		isEven = !isEven
		digitCount++
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