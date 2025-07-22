package raindrops

import "strconv"

func Convert(x int) string {
	var result [16]byte
	pos := 0

	if x%3 == 0 {
		copy(result[pos:], "Pling")
		pos += 5
	}
	if x%5 == 0 {
		copy(result[pos:], "Plang")
		pos += 5
	}
	if x%7 == 0 {
		copy(result[pos:], "Plong")
		pos += 5
	}

	if pos == 0 {
		return strconv.Itoa(x)
	}

	return string(result[:pos])
}
