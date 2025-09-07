package luhn

func Valid(id string) bool {
	length := 0
	sum := 0
	for i := len(id) - 1; i >= 0; i-- {
		char := id[i]
		if char == ' ' {
			continue
		}
		if char < '0' || char > '9' {
			return false
		}
		digit := int(char - '0')
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