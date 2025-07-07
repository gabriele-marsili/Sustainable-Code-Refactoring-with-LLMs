package raindrops

import "strconv"

func Convert(x int) string {
	result := make([]byte, 0, 15) // pre-allocate for max case "PlingPlangPlong"

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
