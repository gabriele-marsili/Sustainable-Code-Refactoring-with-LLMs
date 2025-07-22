package raindrops

import (
	"strconv"
)

func Convert(number int) string {
	var result []byte

	if number%3 == 0 {
		result = append(result, "Pling"...)
	}

	if number%5 == 0 {
		result = append(result, "Plang"...)
	}

	if number%7 == 0 {
		result = append(result, "Plong"...)
	}

	if len(result) > 0 {
		return string(result)
	}

	return strconv.Itoa(number)
}
