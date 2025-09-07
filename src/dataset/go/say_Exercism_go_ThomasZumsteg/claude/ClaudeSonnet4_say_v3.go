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

	var result strings.Builder
	result.Grow(128)
	
	var powerGroups [7]uint64
	groupCount := 0
	
	for num > 0 && groupCount < 7 {
		powerGroups[groupCount] = num % 1000
		num /= 1000
		groupCount++
	}

	for i := groupCount - 1; i >= 0; i-- {
		if powerGroups[i] != 0 {
			sayPowerToBuilder(&result, powerGroups[i])
			if i > 0 {
				result.WriteString(powers[i])
				result.WriteByte(' ')
			}
		}
	}
	
	str := result.String()
	return strings.TrimSpace(str)
}

func sayPowerToBuilder(builder *strings.Builder, num uint64) {
	hundred := (num % 1000) / 100
	ten := (num % 100) / 10
	one := num % 10
	
	if hundred > 0 {
		builder.WriteString(ones[hundred])
		builder.WriteString(" hundred ")
	}
	
	switch {
	case ten == 1:
		builder.WriteString(teens[one])
		builder.WriteByte(' ')
	case ten > 1 && one == 0:
		builder.WriteString(tens[ten])
		builder.WriteByte(' ')
	case ten == 0 && one > 0:
		builder.WriteString(ones[one])
		builder.WriteByte(' ')
	case ten > 1 && one > 0:
		builder.WriteString(tens[ten])
		builder.WriteByte('-')
		builder.WriteString(ones[one])
		builder.WriteByte(' ')
	}
}

func sayPower(num uint64) string {
	var builder strings.Builder
	builder.Grow(32)
	sayPowerToBuilder(&builder, num)
	return builder.String()
}