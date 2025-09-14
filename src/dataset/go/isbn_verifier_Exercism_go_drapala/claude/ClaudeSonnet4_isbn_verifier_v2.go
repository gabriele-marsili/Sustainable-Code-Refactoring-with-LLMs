package isbn

func IsValidISBN(isbn string) bool {
	// Remove dashes and validate in one pass
	cleaned := make([]byte, 0, 10)
	for i := 0; i < len(isbn); i++ {
		c := isbn[i]
		if c == '-' {
			continue
		}
		if (c >= '0' && c <= '9') || c == 'X' {
			cleaned = append(cleaned, c)
		} else {
			return false
		}
	}
	
	// Check length
	if len(cleaned) != 10 {
		return false
	}
	
	// Calculate checksum in single loop
	checksum := 0
	for i := 0; i < 9; i++ {
		digit := int(cleaned[i] - '0')
		checksum += digit * (10 - i)
	}
	
	// Handle last digit
	if cleaned[9] == 'X' {
		checksum += 10
	} else {
		checksum += int(cleaned[9] - '0')
	}
	
	return checksum%11 == 0
}