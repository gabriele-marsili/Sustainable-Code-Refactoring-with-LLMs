package pangram

import (
	"strings"
)

func IsPangram(input string) bool {
	input = strings.ToLower(input)
	
	var seen uint32
	
	for _, r := range input {
		if r >= 'a' && r <= 'z' {
			seen |= 1 << (r - 'a')
			if seen == 0x3ffffff {
				return true
			}
		}
	}
	
	return seen == 0x3ffffff
}