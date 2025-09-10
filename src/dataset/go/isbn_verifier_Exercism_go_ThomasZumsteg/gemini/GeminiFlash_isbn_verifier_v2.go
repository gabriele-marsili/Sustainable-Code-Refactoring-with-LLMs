package isbn

func IsValidISBN(isbn string) bool {
	isbnLength := len(isbn)
	if isbnLength < 10 {
		return false
	}

	digits, checksum := 0, 0
	multiplier := 10

	for i := 0; i < isbnLength; i++ {
		digit := isbn[i]

		if '0' <= digit && digit <= '9' {
			checksum += int(digit-'0') * multiplier
			digits++
			multiplier--
		} else if 'X' == digit {
			if digits != 9 {
				return false
			}
			checksum += 10 * multiplier
			digits++
			multiplier--
		} else {
			continue // Ignore non-relevant characters
		}
	}

	return digits == 10 && checksum%11 == 0
}