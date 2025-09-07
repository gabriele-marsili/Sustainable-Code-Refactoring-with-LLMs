package luhn

func Valid(number string) bool {
	// Remove spaces and validate in one pass
	clean := make([]byte, 0, len(number))
	for i := 0; i < len(number); i++ {
		c := number[i]
		if c == ' ' {
			continue
		}
		if c < '0' || c > '9' {
			return false
		}
		clean = append(clean, c)
	}

	// Check length
	if len(clean) <= 1 {
		return false
	}

	sum := 0
	isEven := false

	// Process from right to left
	for i := len(clean) - 1; i >= 0; i-- {
		digit := int(clean[i] - '0')
		
		if isEven {
			digit *= 2
			if digit > 9 {
				digit -= 9
			}
		}
		
		sum += digit
		isEven = !isEven
	}

	return sum%10 == 0
}