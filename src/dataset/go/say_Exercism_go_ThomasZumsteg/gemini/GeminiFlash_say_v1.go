package say

import (
	"strings"
)

var ones = []string{
	"", "one", "two", "three", "four",
	"five", "six", "seven", "eight", "nine",
}

var teens = []string{
	"ten", "eleven", "twelve", "thirteen", "fourteen",
	"fifteen", "sixteen", "seventeen", "eighteen", "nineteen",
}

var tens = []string{
	"", "", "twenty", "thirty", "forty",
	"fifty", "sixty", "seventy", "eighty", "ninety",
}

var powers = []string{
	"", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion",
}

func Say(num uint64) string {
	if num == 0 {
		return "zero"
	}

	if num > 999999999999999 {
		return "overflow"
	}

	var powerGroups []uint64
	for num > 0 {
		powerGroups = append(powerGroups, num%1000)
		num /= 1000
	}

	var sb strings.Builder
	for i := len(powerGroups) - 1; i >= 0; i-- {
		groupValue := powerGroups[i]
		if groupValue != 0 {
			sb.WriteString(sayPower(groupValue))
			sb.WriteString(powers[i])
			sb.WriteString(" ")
		}
	}

	return strings.TrimSpace(sb.String())
}

func sayPower(num uint64) string {
	var sb strings.Builder

	hundred := num / 100
	if hundred > 0 {
		sb.WriteString(ones[hundred])
		sb.WriteString(" hundred ")
		num %= 100
	}

	if num > 0 {
		if hundred > 0 {
			sb.WriteString("and ")
		}

		if num < 10 {
			sb.WriteString(ones[num])
			sb.WriteString(" ")
		} else if num < 20 {
			sb.WriteString(teens[num-10])
			sb.WriteString(" ")
		} else {
			ten := num / 10
			one := num % 10

			sb.WriteString(tens[ten])
			if one > 0 {
				sb.WriteString("-")
				sb.WriteString(ones[one])
			}
			sb.WriteString(" ")
		}
	}

	return sb.String()
}