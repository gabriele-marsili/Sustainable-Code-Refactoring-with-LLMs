package say

import (
	"strings"
)

// Predefined constants for number-to-words conversion
var (
	ones = []string{"", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"}
	teens = []string{"ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"}
	tens = []string{"", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"}
	powers = []string{"", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion"}
)

// Say converts a number to its English phrase representation
func Say(num uint64) string {
	if num == 0 {
		return "zero"
	}

	var result strings.Builder
	powerIndex := 0

	for num > 0 {
		group := num % 1000
		if group > 0 {
			groupWords := sayPower(group)
			if powerIndex > 0 {
				result.WriteString(powers[powerIndex] + " ")
			}
			result.WriteString(groupWords)
		}
		num /= 1000
		powerIndex++
	}

	words := result.String()
	return strings.TrimSpace(reverseWords(words))
}

// sayPower converts a number (1-999) to its English phrase representation
func sayPower(num uint64) string {
	var result strings.Builder
	hundred, ten, one := num/100, (num%100)/10, num%10

	if hundred > 0 {
		result.WriteString(ones[hundred] + " hundred ")
	}

	if ten == 1 {
		result.WriteString(teens[one] + " ")
	} else {
		if ten > 0 {
			result.WriteString(tens[ten] + " ")
		}
		if one > 0 {
			result.WriteString(ones[one] + " ")
		}
	}

	return result.String()
}

// reverseWords reverses the order of words in a string
func reverseWords(s string) string {
	words := strings.Fields(s)
	for i, j := 0, len(words)-1; i < j; i, j = i+1, j-1 {
		words[i], words[j] = words[j], words[i]
	}
	return strings.Join(words, " ")
}