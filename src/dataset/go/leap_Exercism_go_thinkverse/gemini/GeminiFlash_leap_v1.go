// Package leap contains a function for checking if a year is a leap year.
package leap

// IsLeapYear checks if a year is a leap year.
//
// A year is a leap year if it is divisible by 4, except for end-of-century
// years, which must be divisible by 400.
//
// This implementation optimizes the divisibility by 4 check using a bitwise AND
// operation, which is generally faster than the modulo operator for powers of 2.
// The overall logic structure is preserved to leverage early exits, minimizing
// the number of expensive modulo operations performed.
func IsLeapYear(year int) bool {
	// A year is a leap year if it is divisible by 4.
	// (year & 3) is equivalent to year % 4.
	// If not divisible by 4, it's not a leap year.
	if (year & 3) != 0 {
		return false
	}

	// If divisible by 4, apply the century rule:
	// If it's a century year (divisible by 100), it must also be divisible by 400.
	if year%100 == 0 {
		// If divisible by 100 but not by 400, it's not a leap year.
		if year%400 != 0 {
			return false
		}
	}

	// Otherwise, it meets all conditions for a leap year.
	return true
}