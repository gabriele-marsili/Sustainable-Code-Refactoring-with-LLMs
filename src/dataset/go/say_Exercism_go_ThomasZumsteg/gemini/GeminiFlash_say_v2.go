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

	var powerGroups []uint64
	for num > 0 {
		powerGroups = append(powerGroups, num%1000)
		num /= 1000
	}

	var sb strings.Builder
	for i := len(powerGroups) - 1; i >= 0; i-- {
		if powerGroups[i] != 0 {
			sb.WriteString(sayPower(powerGroups[i]))
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
	}

	remainder := num % 100
	if remainder > 0 {
		if hundred > 0 {
			if remainder < 10 {
				sb.WriteString("and ")
			}
		}
		if remainder < 10 {
			sb.WriteString(ones[remainder])
			sb.WriteString(" ")
		} else if remainder < 20 {
			sb.WriteString(teens[remainder-10])
			sb.WriteString(" ")
		} else {
			ten := remainder / 10
			one := remainder % 10
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