package isbn

func IsValidISBN(isbn string) bool {
	digits, checksum := 0, 0
	isbnLength := len(isbn)

	for i := 0; i < isbnLength; i++ {
		digit := isbn[i]
		if '0' <= digit && digit <= '9' {
			checksum += int(digit-'0') * (10 - digits)
			digits++
		} else if 'X' == digit {
			if digits != 9 {
				return false
			}
			checksum += 10 * (10 - digits)
			digits++
		} else {
			continue // Ignore non-relevant characters for faster processing
		}

		if digits > 10 { // Early exit if more than 10 valid chars are found
			return false
		}
	}

	return digits == 10 && checksum%11 == 0
}