package luhn

func Valid(number string) bool {
	clean := make([]byte, 0, len(number))
	for i := 0; i < len(number); i++ {
		if number[i] != ' ' {
			if number[i] < '0' || number[i] > '9' {
				return false
			}
			clean = append(clean, number[i])
		}
	}

	if len(clean) <= 1 {
		return false
	}

	sum := 0
	isEven := false

	for i := len(clean) - 1; i >= 0; i-- {
		digit := int(clean[i] - '0')

		if isEven {
			digit *= 2
			if digit > 9 {
				digit -= 9
			}
		}

		sum += digit
		isEven = !isEven
	}

	return sum%10 == 0
}