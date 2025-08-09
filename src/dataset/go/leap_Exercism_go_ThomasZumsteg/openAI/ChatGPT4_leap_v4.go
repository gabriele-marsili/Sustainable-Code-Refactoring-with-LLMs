package leap

const TestVersion = 1

func IsLeapYear(year int) bool {
	y4 := year % 4
	y100 := year % 100
	y400 := year % 400
	return y4 == 0 && (y100 != 0 || y400 == 0)
}