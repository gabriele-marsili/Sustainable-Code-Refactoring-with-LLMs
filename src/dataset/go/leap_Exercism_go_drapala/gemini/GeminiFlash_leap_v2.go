// Calculates if a given year is a leap year
package leap

// Returns true if year is a leap year, otherwise returns false
func IsLeapYear(year int) bool {
	// A year is a leap year if it is divisible by 4,
	// unless it is divisible by 100,
	// but it is a leap year if it is divisible by 400.
	return (year%4 == 0 && (year%100 != 0 || year%400 == 0))
}