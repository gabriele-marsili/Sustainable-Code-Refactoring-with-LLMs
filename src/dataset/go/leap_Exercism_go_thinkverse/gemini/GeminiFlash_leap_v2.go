// Package leap contains a function for checking if a year is a leap year.
package leap

// IsLeapYear checks if a year is a leap year.
//
// Optimized for reduced runtime energy consumption by:
// - Replacing modulo 4 with a bitwise AND operation, which is typically faster.
// - Maintaining an early exit for common non-leap year cases.
func IsLeapYear(year int) bool {
	// A year must be divisible by 4.
	// Using bitwise AND for divisibility by a power of 2 (like 4) is generally
	// more efficient than the modulo operator. (year & 3) is equivalent to year % 4.
	if (year & 3) != 0 { // If not divisible by 4
		return false
	}

	// For years divisible by 4, apply the century rule:
	// If it's divisible by 100, it must also be divisible by 400.
	// This means, if (year % 100 == 0 AND year % 400 != 0), it's NOT a leap year.
	if year%100 == 0 && year%400 != 0 {
		return false
	}

	// If it passed both checks, it's a leap year.
	return true
}