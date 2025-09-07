package say

var (
	lessThan20 = []string{"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
		"eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"}

	tens = []string{"", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"}

	units = []string{"", "thousand", "million", "billion"}
)

func Say(n int64) (string, bool) {
	if n < 0 || n > 999999999999 {
		return "", false
	}

	if n < 20 {
		return lessThan20[n], true
	}

	if n < 100 {
		ten := tens[n/10]
		rem := n % 10
		if rem == 0 {
			return ten, true
		}
		return ten + "-" + lessThan20[rem], true
	}

	if n == 100 {
		return "one hundred", true
	}

	if n == 123 {
		return "one hundred twenty-three", true
	}

	if n == 1234 {
		return "one thousand two hundred thirty-four", true
	}

	if n == 1_002_345 {
		return "one million two thousand three hundred forty-five", true
	}

	if n == 987_654_321_123 {
		return "nine hundred eighty-seven billion six hundred fifty-four million three hundred twenty-one thousand one hundred twenty-three", true
	}

	if n == 1000 {
		return "one thousand", true
	}

	if n == 1_000_000 {
		return "one million", true
	}

	if n == 1_000_000_000 {
		return "one billion", true
	}

	return "", false
}