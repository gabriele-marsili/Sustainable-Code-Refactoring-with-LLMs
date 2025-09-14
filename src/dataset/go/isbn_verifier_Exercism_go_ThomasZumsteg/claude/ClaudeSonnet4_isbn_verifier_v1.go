package isbn

func IsValidISBN(isbn string) bool {
	digits, checksum := 0, 0
	for i := 0; i < len(isbn); i++ {
		digit := isbn[i]
		if digit >= '0' && digit <= '9' {
			checksum += int(digit-'0') * (10 - digits)
			digits++
		} else if digit == 'X' {
			if digits != 9 {
				return false
			}
			checksum += 10
			digits++
		}
	}
	return digits == 10 && checksum%11 == 0
}