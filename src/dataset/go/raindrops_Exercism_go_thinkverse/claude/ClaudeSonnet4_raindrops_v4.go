package raindrops

import (
	"strconv"
)

func Convert(number int) string {
	div3 := number%3 == 0
	div5 := number%5 == 0
	div7 := number%7 == 0

	if !(div3 || div5 || div7) {
		return strconv.Itoa(number)
	}

	var result [15]byte
	pos := 0

	if div3 {
		copy(result[pos:], "Pling")
		pos += 5
	}

	if div5 {
		copy(result[pos:], "Plang")
		pos += 5
	}

	if div7 {
		copy(result[pos:], "Plong")
		pos += 5
	}

	return string(result[:pos])
}
