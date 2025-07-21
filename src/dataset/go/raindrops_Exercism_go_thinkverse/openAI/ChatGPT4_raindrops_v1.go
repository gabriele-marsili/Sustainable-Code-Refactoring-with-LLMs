package raindrops

import "strconv"

func Convert(number int) string {
	if number%3 != 0 && number%5 != 0 && number%7 != 0 {
		return strconv.Itoa(number)
	}

	b := make([]byte, 0, 15)

	if number%3 == 0 {
		b = append(b, "Pling"...)
	}
	if number%5 == 0 {
		b = append(b, "Plang"...)
	}
	if number%7 == 0 {
		b = append(b, "Plong"...)
	}

	return string(b)
}
