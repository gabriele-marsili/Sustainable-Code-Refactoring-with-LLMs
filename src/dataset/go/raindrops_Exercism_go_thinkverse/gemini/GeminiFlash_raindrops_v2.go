package raindrops

import (
	"strconv"
	"strings"
)

func Convert(number int) string {
	var sb strings.Builder
	sb.Grow(15) // Pre-allocate enough space for "PlingPlangPlong"

	if number%3 == 0 {
		sb.WriteString("Pling")
	}

	if number%5 == 0 {
		sb.WriteString("Plang")
	}

	if number%7 == 0 {
		sb.WriteString("Plong")
	}

	if sb.Len() > 0 {
		return sb.String()
	}

	return strconv.Itoa(number)
}
