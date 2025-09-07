package luhn

import (
	"strings"
)

func Valid(number string) bool {
	clean := strings.ReplaceAll(number, " ", "")
	
	if len(clean) <= 1 {
		return false
	}
	
	sum := 0
	isEven := false
	
	for i := len(clean) - 1; i >= 0; i-- {
		digit := clean[i]
		if digit < '0' || digit > '9' {
			return false
		}
		
		n := int(digit - '0')
		
		if isEven {
			n *= 2
			if n > 9 {
				n -= 9
			}
		}
		
		sum += n
		isEven = !isEven
	}
	
	return sum%10 == 0
}