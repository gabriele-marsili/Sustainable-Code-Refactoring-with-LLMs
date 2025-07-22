package raindrops

import "strconv"

func Convert(x int) string {
	var result []byte

	if x%3 == 0 {
		result = append(result, "Pling"...)
	}
	if x%5 == 0 {
		result = append(result, "Plang"...)
	}
	if x%7 == 0 {
		result = append(result, "Plong"...)
	}

	if len(result) == 0 {
		return strconv.Itoa(x)
	}

	return string(result)
}
