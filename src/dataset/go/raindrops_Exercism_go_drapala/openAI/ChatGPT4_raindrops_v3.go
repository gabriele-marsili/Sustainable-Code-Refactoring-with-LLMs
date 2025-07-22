package raindrops

import "strconv"

func Convert(x int) string {
	if x%3 != 0 && x%5 != 0 && x%7 != 0 {
		return strconv.Itoa(x)
	}

	s := ""

	if x%3 == 0 {
		s = "Pling"
	}
	if x%5 == 0 {
		s += "Plang"
	}
	if x%7 == 0 {
		s += "Plong"
	}

	return s
}
