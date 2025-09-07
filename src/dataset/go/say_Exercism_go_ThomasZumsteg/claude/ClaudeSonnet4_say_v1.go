package say

import (
	"strings"
)

//ones converts a digit to the english phrase
var ones = [10]string{
	"", "one", "two", "three", "four",
	"five", "six", "seven", "eight", "nine",
}

//teens converts a ones digit in a teen number to the english phrase
var teens = [10]string{
	"ten", "eleven", "twelve", "thirteen", "fourteen",
	"fifteen", "sixteen", "seventeen", "eighteen", "nineteen",
}

//tens converts a tens digits and the english phrase
var tens = [10]string{
	"", "ten", "twenty", "thirty", "forty",
	"fifty", "sixty", "seventy", "eighty", "ninety",
}

//powers coverts the position of a groups of digits to the english phrase
var powers = [7]string{
	"", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion",
}

/*Say converts a number to the english phrase for the number*/
func Say(num uint64) string {
	if num == 0 {
		return "zero"
	}

	var powerGroups [7]uint64
	groupCount := 0
	for num > 0 {
		powerGroups[groupCount] = num % 1000
		num /= 1000
		groupCount++
	}

	var result strings.Builder
	result.Grow(128) // Pre-allocate reasonable capacity
	
	for i := groupCount - 1; i >= 0; i-- {
		if powerGroups[i] != 0 {
			sayPower(powerGroups[i], &result)
			if i > 0 {
				result.WriteString(powers[i])
				result.WriteByte(' ')
			}
		}
	}
	
	str := result.String()
	return strings.TrimSpace(str)
}

/*sayPower coverts a number to the english phrase, but only for numbers 1-999*/
func sayPower(num uint64, result *strings.Builder) {
	hundred := (num % 1000) / 100
	ten := (num % 100) / 10
	one := num % 10
	
	if hundred > 0 {
		result.WriteString(ones[hundred])
		result.WriteString(" hundred ")
	}
	
	switch {
	case ten == 1:
		result.WriteString(teens[one])
		result.WriteByte(' ')
	case one == 0 && ten > 0:
		result.WriteString(tens[ten])
		result.WriteByte(' ')
	case ten == 0 && one > 0:
		result.WriteString(ones[one])
		result.WriteByte(' ')
	case ten > 0 && one > 0:
		result.WriteString(tens[ten])
		result.WriteByte('-')
		result.WriteString(ones[one])
		result.WriteByte(' ')
	}
}