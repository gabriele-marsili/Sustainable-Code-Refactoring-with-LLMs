package say

import (
	"strings"
)

var numsMap = map[int64]string{
	0:  "zero",
	1:  "one",
	2:  "two",
	3:  "three",
	4:  "four",
	5:  "five",
	6:  "six",
	7:  "seven",
	8:  "eight",
	9:  "nine",
	10: "ten",
	11: "eleven",
	12: "twelve",
	13: "thirteen",
	14: "fourteen",
	15: "fifteen",
	16: "sixteen",
	17: "seventeen",
	18: "eighteen",
	19: "nineteen",
	20: "twenty",
	30: "thirty",
	40: "forty",
	50: "fifty",
	60: "sixty",
	70: "seventy",
	80: "eighty",
	90: "ninety",
}

func Ones2Tens(n int64) string {
	if n >= 10 {
		ones := n % 10
		tens := n / 10
		if tens == 1 {
			return numsMap[n]
		} else {
			result := numsMap[tens*10]
			if ones != 0 {
				result += "-" + numsMap[ones]
			}
			return result
		}
	} else if n < 10 {
		return numsMap[n]
	}
	return ""
}

func Ones2Hundreds(n int64) string {
	if n >= 100 {
		hundreds := n / 100
		tensandones := n % 100
		result := numsMap[hundreds] + " hundred"
		if tensandones != 0 {
			result += " " + Ones2Tens(tensandones)
		}
		return result
	} else if n < 100 {
		return Ones2Tens(n)
	}
	return ""
}

func Say(n int64) (string, bool) {
	if n < 0 || n > 999999999999 {
		return "", false
	}

	if n == 0 {
		return "zero", true
	}

	var result strings.Builder

	billions := n / 1000000000
	n %= 1000000000

	millions := n / 1000000
	n %= 1000000

	thousands := n / 1000
	n %= 1000

	hundreds := n

	if billions != 0 {
		result.WriteString(Ones2Hundreds(billions))
		result.WriteString(" billion")
		if millions != 0 || thousands != 0 || hundreds != 0 {
			result.WriteString(" ")
		}
	}

	if millions != 0 {
		result.WriteString(Ones2Hundreds(millions))
		result.WriteString(" million")
		if thousands != 0 || hundreds != 0 {
			result.WriteString(" ")
		}
	}

	if thousands != 0 {
		result.WriteString(Ones2Hundreds(thousands))
		result.WriteString(" thousand")
		if hundreds != 0 {
			result.WriteString(" ")
		}
	}

	if hundreds != 0 {
		result.WriteString(Ones2Hundreds(hundreds))
	}

	return result.String(), true
}