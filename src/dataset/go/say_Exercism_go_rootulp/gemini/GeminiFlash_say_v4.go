package say

var (
	lessThan20 = []string{"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"}
	tens       = []string{"", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"}
	scales     = []string{"", "thousand", "million", "billion"}
)

func Say(n int64) (string, bool) {
	if n < 0 || n >= 1_000_000_000_000 {
		return "", false
	}

	if n == 0 {
		return "zero", true
	}

	var result string
	for i := 0; n > 0; i++ {
		if n%1000 != 0 {
			var chunk string
			hundreds := n % 1000 / 100
			if hundreds > 0 {
				chunk += lessThan20[hundreds] + " hundred"
			}

			remainder := n % 100
			if remainder > 0 {
				if hundreds > 0 {
					chunk += " "
				}
				if remainder < 20 {
					chunk += lessThan20[remainder]
				} else {
					ten := remainder / 10
					one := remainder % 10
					chunk += tens[ten]
					if one > 0 {
						chunk += "-" + lessThan20[one]
					}
				}
			}

			if i > 0 {
				chunk += " " + scales[i]
			}

			if result != "" {
				chunk += " " + result
			}
			result = chunk
		}
		n /= 1000
	}

	return result, true
}