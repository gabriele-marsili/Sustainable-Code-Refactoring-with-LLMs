package say

import (
	"strings"
)

var ones = [10]string{
	"", "one", "two", "three", "four",
	"five", "six", "seven", "eight", "nine",
}

var teens = [10]string{
	"ten", "eleven", "twelve", "thirteen", "fourteen",
	"fifteen", "sixteen", "seventeen", "eighteen", "nineteen",
}

var tens = [10]string{
	"", "ten", "twenty", "thirty", "forty",
	"fifty", "sixty", "seventy", "eighty", "ninety",
}

var powers = [7]string{
	"", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion",
}

func Say(num uint64) string {
	if num == 0 {
		return "zero"
	}

	var powerGroups [7]uint64
	groupCount := 0
	
	for num > 0 && groupCount < 7 {
		powerGroups[groupCount] = num % 1000
		num /= 1000
		groupCount++
	}

	var result strings.Builder
	result.Grow(128)
	
	for i := groupCount - 1; i >= 0; i-- {
		if powerGroups[i] != 0 {
			groupStr := sayPower(powerGroups[i])
			result.WriteString(groupStr)
			if i > 0 {
				result.WriteString(powers[i])
				result.WriteByte(' ')
			}
		}
	}
	
	return strings.TrimSpace(result.String())
}

func sayPower(num uint64) string {
	var result strings.Builder
	result.Grow(32)
	
	hundred := num / 100
	remainder := num % 100
	ten := remainder / 10
	one := remainder % 10
	
	if hundred > 0 {
		result.WriteString(ones[hundred])
		result.WriteString(" hundred ")
	}
	
	if remainder >= 10 && remainder < 20 {
		result.WriteString(teens[one])
		result.WriteByte(' ')
	} else {
		if ten > 0 {
			result.WriteString(tens[ten])
			if one > 0 {
				result.WriteByte('-')
				result.WriteString(ones[one])
			}
			result.WriteByte(' ')
		} else if one > 0 {
			result.WriteString(ones[one])
			result.WriteByte(' ')
		}
	}
	
	return result.String()
}