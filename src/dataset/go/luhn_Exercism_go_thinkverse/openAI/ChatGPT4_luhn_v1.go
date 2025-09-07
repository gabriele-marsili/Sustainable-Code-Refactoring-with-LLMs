package luhn

func Valid(id string) bool {
	var sum, count int
	parity := -1

	for i := len(id) - 1; i >= 0; i-- {
		char := id[i]

		if char == ' ' {
			continue
		}

		if char < '0' || char > '9' {
			return false
		}

		digit := int(char - '0')
		if parity == -1 {
			parity = count % 2
		}

		if count%2 == parity {
			digit *= 2
			if digit > 9 {
				digit -= 9
			}
		}

		sum += digit
		count++
	}

	return count > 1 && sum%10 == 0
}