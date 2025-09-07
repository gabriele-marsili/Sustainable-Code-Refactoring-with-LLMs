package luhn

// Valid check is a string is a valid LUHN number.
//
// Benchmarks done with Core i5 760 2.80GHz
//
// Operations  Time (ns/op)
// 271239      3730
//
// 279519      3726
//
// 1189321     1021
//
// 3331646     350
//
// 10332144    112
//
// Thank you to @thomas-holmes[^1], looking at that iteration made my next iteration even faster.
//
// [^1]: https://exercism.org/tracks/go/exercises/luhn/solutions/thomas-holmes
func Valid(id string) bool {
	var digitCount int
	var sum int
	var isEven bool

	// Process string from right to left
	for i := len(id) - 1; i >= 0; i-- {
		char := id[i]
		
		if char == ' ' {
			continue
		}

		if char < '0' || char > '9' {
			return false
		}

		digit := int(char - '0')
		digitCount++

		if isEven {
			digit *= 2
			if digit > 9 {
				digit -= 9
			}
		}

		sum += digit
		isEven = !isEven
	}

	return digitCount > 1 && sum%10 == 0
}