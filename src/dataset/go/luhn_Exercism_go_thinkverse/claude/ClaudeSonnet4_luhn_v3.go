package luhn

func Valid(id string) bool {
	if len(id) <= 1 {
		return false
	}

	var sum int
	var digitCount int
	
	for i := len(id) - 1; i >= 0; i-- {
		char := id[i]
		
		if char == ' ' {
			continue
		}
		
		if char < '0' || char > '9' {
			return false
		}
		
		digit := int(char - '0')
		digitCount++
		
		if digitCount%2 == 0 {
			digit *= 2
			if digit > 9 {
				digit -= 9
			}
		}
		
		sum += digit
	}
	
	return digitCount > 1 && sum%10 == 0
}