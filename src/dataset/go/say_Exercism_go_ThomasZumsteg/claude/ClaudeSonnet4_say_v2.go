package say

import (
	"strings"
)

//ones converts a digit to the english phrase
var ones = []string{
	"", "one", "two", "three", "four",
	"five", "six", "seven", "eight", "nine",
}

//teens converts a ones digit in a teen number to the english phrase
var teens = []string{
	"ten", "eleven", "twelve", "thirteen", "fourteen",
	"fifteen", "sixteen", "seventeen", "eighteen", "nineteen",
}

//tens converts a tens digits and the english phrase
var tens = []string{
	"", "ten", "twenty", "thirty", "forty",
	"fifty", "sixty", "seventy", "eighty", "ninty",
}

//powers coverts the position of a groups of digits to the english phrase
var powers = []string{
	"", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion",
}

/*Say converts a number to the english phrase for the number*/
func Say(num uint64) string {
	if num == 0 {
		return "zero"
	}

	var result strings.Builder
	powerIndex := 0
	
	for num > 0 {
		group := num % 1000
		if group != 0 {
			groupStr := sayPower(group)
			if powerIndex > 0 {
				groupStr += powers[powerIndex] + " "
			}
			if result.Len() > 0 {
				result.WriteString(groupStr)
				temp := result.String()
				result.Reset()
				result.WriteString(groupStr)
				result.WriteString(temp)
			} else {
				result.WriteString(groupStr)
			}
		}
		num /= 1000
		powerIndex++
	}
	
	return strings.TrimSpace(result.String())
}

/*sayPower coverts a number to the english phrase, but only for numbers 1-999*/
func sayPower(num uint64) string {
	var result strings.Builder
	hundred, ten, one := (num%1000)/100, (num%100)/10, num%10
	
	if hundred > 0 {
		result.WriteString(ones[hundred])
		result.WriteString(" hundred ")
	}
	
	switch {
	case ten == 1:
		result.WriteString(teens[one])
		result.WriteString(" ")
	case one == 0 && ten > 0:
		result.WriteString(tens[ten])
		result.WriteString(" ")
	case ten == 0 && one > 0:
		result.WriteString(ones[one])
		result.WriteString(" ")
	case ten > 0 && one > 0:
		result.WriteString(tens[ten])
		result.WriteString("-")
		result.WriteString(ones[one])
		result.WriteString(" ")
	}
	
	return result.String()
}