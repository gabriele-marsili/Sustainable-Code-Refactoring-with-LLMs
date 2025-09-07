package say

import (
	"fmt"
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
	"", "ten", "twenty", "thirty", "forty",
	"fifty", "sixty", "seventy", "eighty", "ninety",
}

var powers = []string{
	"", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion",
}

func Say(num uint64) string {
	if num == 0 {
		return "zero"
	}

	if num < 20 {
		if num < 10 {
			return ones[num]
		}
		return teens[num-10]
	}

	var powerGroups []uint64
	for num > 0 {
		powerGroups = append(powerGroups, num%1000)
		num /= 1000
	}

	var sb strings.Builder
	for i := len(powerGroups) - 1; i >= 0; i-- {
		group := powerGroups[i]
		if group != 0 {
			sb.WriteString(sayPower(group))
			sb.WriteString(powers[i])
			sb.WriteString(" ")
		}
	}

	return strings.TrimSpace(sb.String())
}

func sayPower(num uint64) string {
	var sb strings.Builder
	hundred := num / 100
	ten := (num % 100) / 10
	one := num % 10

	if hundred > 0 {
		sb.WriteString(ones[hundred])
		sb.WriteString(" hundred ")
	}

	if ten == 1 {
		sb.WriteString(teens[one])
		sb.WriteString(" ")
		return sb.String()
	}

	if ten > 0 {
		sb.WriteString(tens[ten])
		sb.WriteString("-")
	}

	if one > 0 {
		sb.WriteString(ones[one])
		sb.WriteString(" ")
	} else if ten > 0 {
		sb.WriteString(" ")
	}

	return sb.String()
}