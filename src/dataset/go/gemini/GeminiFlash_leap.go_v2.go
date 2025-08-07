package leap

func IsLeapYear(year int) bool {
	// According to the Gregorian calendar rules:
	// 1. A year is a leap year if it is divisible by 4,
	// 2. UNLESS it is divisible by 100,
	// 3. BUT it IS a leap year if it is divisible by 400.

	// This implementation orders the checks to minimize operations for the most common cases.
	//
	// Case 1: Not divisible by 4 (e.g., 2003, 2005) - Most common non-leap year.
	// This check immediately returns false for ~75% of years with only one modulo operation.
	if year%4 != 0 {
		return false
	}

	// At this point, the year is divisible by 4.
	// Case 2: Divisible by 4 but not by 100 (e.g., 2004, 2008) - Most common leap year.
	// This check immediately returns true for ~24% of years with a second modulo operation.
	if year%100 != 0 {
		return true
	}

	// At this point, the year is divisible by 4 AND by 100 (e.g., 1900, 2000, 2100).
	// This covers the remaining ~1% of years.
	// Case 3: Divisible by 400 (e.g., 2000, 2400) - These are leap years.
	// Case 4: Divisible by 100 but not by 400 (e.g., 1900, 2100) - These are NOT leap years.
	// The final check determines this with a third modulo operation.
	return year%400 == 0
}