package isbn

func IsValidISBN(isbn string) bool {
	if len(isbn) < 10 {
		return false
	}
	
	digits, checksum := 0, 0
	for i := 0; i < len(isbn) && digits < 10; i++ {
		digit := isbn[i]
		if digit >= '0' && digit <= '9' {
			checksum += int(digit-'0') * (10 - digits)
			digits++
		} else if digit == 'X' && digits == 9 {
			checksum += 10
			digits++
		} else if digit != '-' && digit != ' ' {
			return false
		}
	}
	return digits == 10 && checksum%11 == 0
}