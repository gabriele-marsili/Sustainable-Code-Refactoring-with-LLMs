package luhn

func Valid(id string) bool {
	sum := 0
	length := 0
	for i := len(id) - 1; i >= 0; i-- {
		r := id[i]
		if r == ' ' {
			continue
		}
		if r < '0' || r > '9' {
			return false
		}
		digit := int(r - '0')
		if length%2 == 1 {
			digit *= 2
			if digit > 9 {
				digit -= 9
			}
		}
		sum += digit
		length++
	}
	return length > 1 && sum%10 == 0
}