package leap

func IsLeapYear(year int) bool {
	return (year&3 == 0 && year%100 != 0) || (year%400 == 0)
}