package raindrops

import "strconv"

func Convert(x int) string {
	var s []byte

	if x%3 == 0 {
		s = append(s, "Pling"...)
	}
	if x%5 == 0 {
		s = append(s, "Plang"...)
	}
	if x%7 == 0 {
		s = append(s, "Plong"...)
	}

	if len(s) == 0 {
		return strconv.Itoa(x)
	}
	return string(s)
}
