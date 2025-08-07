package leap

func IsLeapYear(year int) bool {
	// A year is not a leap year if it's not divisible by 4.
	// This covers 75% of cases with a single modulo operation.
	if year%4 != 0 {
		return false
	}

	// At this point, the year is divisible by 4.
	// If it's not divisible by 100, it's a leap year.
	// This covers years like 2004, 2008, etc.
	if year%100 != 0 {
		return true
	}

	// At this point, the year is divisible by both 4 and 100.
	// It is a leap year only if it is also divisible by 400.
	// This distinguishes 2000 (leap) from 1900 (not leap).
	return year%400 == 0
}