package raindrops

import "strconv"

const TestVersion = 1

func Convert(num int) string {
	switch {
	case num%3 == 0 && num%5 == 0 && num%7 == 0:
		return "PlingPlangPlong"
	case num%3 == 0 && num%5 == 0:
		return "PlingPlang"
	case num%3 == 0 && num%7 == 0:
		return "PlingPlong"
	case num%5 == 0 && num%7 == 0:
		return "PlangPlong"
	case num%3 == 0:
		return "Pling"
	case num%5 == 0:
		return "Plang"
	case num%7 == 0:
		return "Plong"
	default:
		return strconv.Itoa(num)
	}
}
