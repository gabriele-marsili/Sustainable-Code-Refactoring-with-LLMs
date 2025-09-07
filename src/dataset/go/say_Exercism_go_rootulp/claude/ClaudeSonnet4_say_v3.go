package say

import "strings"

var (
	ones = [20]string{
		"", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
		"ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
		"seventeen", "eighteen", "nineteen",
	}
	tens = [10]string{
		"", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety",
	}
	scales = []struct {
		value int64
		name  string
	}{
		{1_000_000_000_000, "trillion"},
		{1_000_000_000, "billion"},
		{1_000_000, "million"},
		{1_000, "thousand"},
	}
)

func Say(n int64) (string, bool) {
	if n < 0 || n >= 1_000_000_000_000 {
		return "", false
	}
	
	if n == 0 {
		return "zero", true
	}
	
	return convertNumber(n), true
}

func convertNumber(n int64) string {
	if n == 0 {
		return ""
	}
	
	var parts []string
	
	for _, scale := range scales {
		if n >= scale.value {
			quotient := n / scale.value
			parts = append(parts, convertHundreds(quotient), scale.name)
			n %= scale.value
		}
	}
	
	if n > 0 {
		parts = append(parts, convertHundreds(n))
	}
	
	return strings.Join(parts, " ")
}

func convertHundreds(n int64) string {
	if n == 0 {
		return ""
	}
	
	var parts []string
	
	if n >= 100 {
		parts = append(parts, ones[n/100], "hundred")
		n %= 100
	}
	
	if n >= 20 {
		tensDigit := n / 10
		onesDigit := n % 10
		if onesDigit == 0 {
			parts = append(parts, tens[tensDigit])
		} else {
			parts = append(parts, tens[tensDigit]+"-"+ones[onesDigit])
		}
	} else if n > 0 {
		parts = append(parts, ones[n])
	}
	
	return strings.Join(parts, " ")
}