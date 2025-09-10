package isbn

func IsValidISBN(isbn string) bool {
	var checksum, weight int
	for i, digit := range isbn {
		switch {
		case '0' <= digit && digit <= '9':
			checksum += int(digit-'0') * (10 - weight)
			weight++
		case digit == 'X' && weight == 9:
			checksum += 10
			weight++
		}
		if weight > 10 {
			return false
		}
	}
	return weight == 10 && checksum%11 == 0
}