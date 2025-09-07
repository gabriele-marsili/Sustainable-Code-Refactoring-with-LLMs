package say

import (
	"strings"
)

var (
	ones = []string{"", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"}
	teens = []string{"ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"}
	tens = []string{"", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"}
	powers = []string{"", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion"}
)

func Say(num uint64) string {
	if num == 0 {
		return "zero"
	}

	powerGroups := make([]uint64, 0, 7)
	for num > 0 {
		powerGroups = append(powerGroups, num%1000)
		num /= 1000
	}

	var sb strings.Builder
	for i := len(powerGroups) - 1; i >= 0; i-- {
		if powerGroups[i] != 0 {
			sb.WriteString(sayPower(powerGroups[i]))
			if powers[i] != "" {
				sb.WriteString(powers[i])
				sb.WriteByte(' ')
			}
		}
	}
	return strings.TrimSpace(sb.String())
}

func sayPower(num uint64) string {
	var sb strings.Builder
	hundred, ten, one := (num%1000)/100, (num%100)/10, num%10
	if hundred > 0 {
		sb.WriteString(ones[hundred])
		sb.WriteString(" hundred ")
	}
	if ten == 1 {
		sb.WriteString(teens[one])
		sb.WriteByte(' ')
	} else {
		if ten > 0 {
			sb.WriteString(tens[ten])
			if one > 0 {
				sb.WriteByte('-')
			} else {
				sb.WriteByte(' ')
			}
		}
		if one > 0 {
			sb.WriteString(ones[one])
			sb.WriteByte(' ')
		}
	}
	return sb.String()
}