package raindrops

import (
	"strconv"
	"strings"
)

func Convert(number int) string {
	var parts []string

	if number%3 == 0 {
		parts = append(parts, "Pling")
	}
	if number%5 == 0 {
		parts = append(parts, "Plang")
	}
	if number%7 == 0 {
		parts = append(parts, "Plong")
	}

	if len(parts) > 0 {
		return strings.Join(parts, "")
	}

	return strconv.Itoa(number)
}
