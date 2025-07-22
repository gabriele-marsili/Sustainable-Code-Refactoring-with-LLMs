package raindrops

import "strconv"

func Convert(x int) string {
	var s string

	if x%3 == 0 {
		s = "Pling"
	}
	if x%5 == 0 {
		s += "Plang"
	}
	if x%7 == 0 {
		s += "Plong"
	}

	if s == "" {
		return strconv.Itoa(x)
	}
	return s
}
