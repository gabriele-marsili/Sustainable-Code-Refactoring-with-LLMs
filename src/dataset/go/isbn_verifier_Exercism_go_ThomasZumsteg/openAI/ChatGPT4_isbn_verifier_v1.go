package isbn

func IsValidISBN(isbn string) bool {
	var checksum, digits int
	for i, digit := range isbn {
		switch {
		case '0' <= digit && digit <= '9':
			checksum += int(digit-'0') * (10 - digits)
			digits++
		case digit == 'X' && i == 9:
			checksum += 10
			digits++
		}
		if digits > 10 {
			return false
		}
	}
	return digits == 10 && checksum%11 == 0
}