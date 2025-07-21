package raindrops

import (
	"strconv"
)

func Convert(x int) string {
	var s string

	// Pre-allocate string builder capacity to minimize reallocations
	// The maximum possible length is "PlingPlangPlong" (14 characters) or "2147483647" (10 characters for max int32),
	// so 15 is a safe upper bound for initial capacity.
	sb := make([]byte, 0, 15)

	if x%3 == 0 {
		sb = append(sb, "Pling"...)
	}
	if x%5 == 0 {
		sb = append(sb, "Plang"...)
	}
	if x%7 == 0 {
		sb = append(sb, "Plong"...)
	}

	if len(sb) == 0 {
		s = strconv.Itoa(x)
	} else {
		s = string(sb)
	}

	return s
}
