package raindrops

import (
	"strconv"
)

func Convert(number int) string {
	var b [3]byte
	n := 0

	if number%3 == 0 {
		b[n] = 'P'
		b[n+1] = 'l'
		b[n+2] = 'i'
		n += 3
		b = append(b[:n], "ng"...)
		n += 2
	}
	if number%5 == 0 {
		if n == 0 {
			b[0] = 'P'
			b[1] = 'l'
			b[2] = 'a'
			n = 3
		}
		b = append(b[:n], "ang"...)
		n += 3
	}
	if number%7 == 0 {
		if n == 0 {
			b[0] = 'P'
			b[1] = 'l'
			b[2] = 'o'
			n = 3
		}
		b = append(b[:n], "ng"...)
		n += 2
	}

	if n > 0 {
		return string(b[:n])
	}
	return strconv.Itoa(number)
}
