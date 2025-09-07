package say

var (
	lessThan20 = []string{"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
		"eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"}

	tens = []string{"", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"}

	scales = []string{"", "thousand", "million", "billion"}
)

func Say(n int64) (string, bool) {
	if n < 0 || n > 999_999_999_999 {
		return "", false
	}

	if n == 0 {
		return "zero", true
	}

	return say(n), true
}

func say(n int64) string {
	if n < 20 {
		return lessThan20[n]
	}

	if n < 100 {
		ten := tens[n/10]
		rem := n % 10
		if rem != 0 {
			return ten + "-" + lessThan20[rem]
		}
		return ten
	}

	if n < 1000 {
		hundreds := lessThan20[n/100] + " hundred"
		rem := n % 100
		if rem != 0 {
			return hundreds + " " + say(rem)
		}
		return hundreds
	}

	for i := 0; i < len(scales); i++ {
		scaleValue := int64(1)
		for j := 0; j < i; j++ {
			scaleValue *= 1000
		}

		if n < scaleValue*1000 {
			num := n / scaleValue
			rem := n % scaleValue

			scaleStr := scales[i]

			if rem != 0 {
				return say(num) + " " + scaleStr + " " + say(rem)
			}
			return say(num) + " " + scaleStr
		}
	}

	return "" // Should not reach here, but added for safety.
}