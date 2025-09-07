package luhn

func Valid(id string) bool {
	var product, count int
	parity := -1

	for i := len(id) - 1; i >= 0; i-- {
		char := id[i]

		if char == ' ' {
			continue
		}

		if char < '0' || char > '9' {
			return false
		}

		num := int(char - '0')
		if parity == -1 {
			parity = count % 2
		}

		if count%2 == parity {
			num *= 2
			if num > 9 {
				num -= 9
			}
		}

		product += num
		count++
	}

	return count > 1 && product%10 == 0
}