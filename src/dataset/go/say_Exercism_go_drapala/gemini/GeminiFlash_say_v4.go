package say

import (
	"strings"
)

var nums = map[int64]string{
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

func lessThanHundred(n int64) string {
	if n < 10 {
		return nums[n]
	}
	if n < 20 {
		return nums[n]
	}
	tens := (n / 10) * 10
	ones := n % 10
	if ones == 0 {
		return nums[tens]
	}
	return nums[tens] + "-" + nums[ones]
}

func lessThanThousand(n int64) string {
	if n < 100 {
		return lessThanHundred(n)
	}
	hundreds := n / 100
	remainder := n % 100
	if remainder == 0 {
		return nums[hundreds] + " hundred"
	}
	return nums[hundreds] + " hundred " + lessThanHundred(remainder)
}

func Say(n int64) (string, bool) {
	if n < 0 || n > 999999999999 {
		return "", false
	}

	if n == 0 {
		return "zero", true
	}

	var result []string

	billions := n / 1000000000
	n %= 1000000000

	millions := n / 1000000
	n %= 1000000

	thousands := n / 1000
	n %= 1000

	hundreds := n

	if billions > 0 {
		result = append(result, lessThanThousand(billions)+" billion")
	}
	if millions > 0 {
		result = append(result, lessThanThousand(millions)+" million")
	}
	if thousands > 0 {
		result = append(result, lessThanThousand(thousands)+" thousand")
	}
	if hundreds > 0 || len(result) == 0 {
		result = append(result, lessThanThousand(hundreds))
	}

	return strings.Join(result, " "), true
}