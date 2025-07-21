package raindrops

import "strconv"

func Convert(n int) string {
	var result []byte

	if n%3 == 0 {
		result = append(result, "Pling"...)
	}
	if n%5 == 0 {
		result = append(result, "Plang"...)
	}
	if n%7 == 0 {
		result = append(result, "Plong"...)
	}

	if len(result) == 0 {
		return strconv.Itoa(n)
	}
	return string(result)
}
