package leap

func IsLeapYear(year int) bool {
	if year%400 == 0 {
		return true
	} else if year%100 == 0 {
		return false
	} else if (year & 3) == 0 {
		return true
	}
	return false
}