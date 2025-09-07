package say

var lessThan20 = []string{"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"}
var tens = []string{"", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"}
var thousands = []string{"", "thousand", "million", "billion"}

func Say(n int64) (string, bool) {
	if n < 0 || n >= 1_000_000_000_000 {
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

	if n < 1000 {
		hundreds := lessThan20[n/100] + " hundred"
		rem := n % 100
		if rem == 0 {
			return hundreds, true
		}
		s, _ := Say(int64(rem))
		return hundreds + " " + s, true
	}

	for i := 3; i >= 1; i-- {
		pow := int64(1)
		for j := 0; j < i*3; j++ {
			pow *= 10
		}
		if n >= pow {
			prefix := n / pow
			suffix := n % pow

			prefixStr, _ := Say(prefix)
			result := prefixStr + " " + thousands[i]

			if suffix > 0 {
				suffixStr, _ := Say(suffix)
				if suffix < 100 {
					result += " " + suffixStr
				} else {
					result += " " + suffixStr
				}

			}
			return result, true
		}
	}

	return "", false
}