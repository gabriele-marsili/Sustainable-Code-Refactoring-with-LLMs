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
	scales = [4]string{"", "thousand", "million", "billion"}
)

func Say(n int64) (string, bool) {
	if n < 0 || n >= 1_000_000_000_000 {
		return "", false
	}
	
	if n == 0 {
		return "zero", true
	}
	
	var parts []string
	scaleIndex := 0
	
	for n > 0 && scaleIndex < len(scales) {
		chunk := n % 1000
		if chunk > 0 {
			chunkStr := convertHundreds(chunk)
			if scaleIndex > 0 {
				chunkStr += " " + scales[scaleIndex]
			}
			parts = append(parts, chunkStr)
		}
		n /= 1000
		scaleIndex++
	}
	
	if n > 0 {
		return "", false
	}
	
	for i := 0; i < len(parts)/2; i++ {
		parts[i], parts[len(parts)-1-i] = parts[len(parts)-1-i], parts[i]
	}
	
	return strings.Join(parts, " "), true
}

func convertHundreds(n int64) string {
	var result strings.Builder
	
	if n >= 100 {
		result.WriteString(ones[n/100])
		result.WriteString(" hundred")
		n %= 100
		if n > 0 {
			result.WriteByte(' ')
		}
	}
	
	if n >= 20 {
		result.WriteString(tens[n/10])
		n %= 10
		if n > 0 {
			result.WriteByte('-')
			result.WriteString(ones[n])
		}
	} else if n > 0 {
		result.WriteString(ones[n])
	}
	
	return result.String()
}