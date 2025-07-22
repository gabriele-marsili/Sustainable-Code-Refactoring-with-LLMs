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

func isDivisibleByPlingPlangPlong(n int) bool {
	return n%3 == 0 || n%5 == 0 || n%7 == 0
}

func isPling(n int) bool {
	return n%3 == 0
}

func isPlang(n int) bool {
	return n%5 == 0
}

func isPlong(n int) bool {
	return n%7 == 0
}
