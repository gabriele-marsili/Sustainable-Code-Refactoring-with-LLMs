// Package leap contains a function for checking if a year is a leap year.
package leap

// IsLeapYear checks if a year is a leap year.
//
// The logic follows the standard Gregorian calendar rules:
// - A year is a leap year if it is divisible by 4.
// - Except if it is divisible by 100, then it is NOT a leap year.
// - Unless it is also divisible by 400, then it IS a leap year.
//
// Benchmark 4658377 ~257 ns/op (original)
//
// Optimized for performance and energy efficiency by:
// 1. Replacing `year % 4` with `(year & 3)`. Bitwise AND is typically faster
//    than integer modulo for powers of two, leveraging CPU architecture
//    efficiencies.
// 2. Preserving the early exit pattern, which is efficient for common cases
//    (years not divisible by 4).
func IsLeapYear(year int) bool {
	// Rule 1: If the year is not divisible by 4, it's not a leap year.
	// Using bitwise AND for `year % 4 == 0` check, which is generally
	// faster for powers of 2. `(year & 3) != 0` is equivalent to `year % 4 != 0`.
	if (year & 3) != 0 {
		return false
	}

	// Rule 2 & 3: If the year is divisible by 100 AND not divisible by 400,
	// then it's not a leap year (e.g., 1900, 2100).
	// Otherwise, if it's divisible by 400 (e.g., 2000), it IS a leap year,
	// and if it's not divisible by 100 (e.g., 2004), it's also a leap year.
	if year%100 == 0 && year%400 != 0 {
		return false
	}

	// If the year passes the above conditions, it is a leap year.
	return true
}