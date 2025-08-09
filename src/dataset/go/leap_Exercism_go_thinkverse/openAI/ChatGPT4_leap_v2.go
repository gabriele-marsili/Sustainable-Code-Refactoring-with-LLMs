// Package leap contains a function for checking if a year is a leap year.
package leap

// IsLeapYear checks if a year is a leap year.
//
// Optimized for reduced CPU cycles and branch prediction efficiency.
func IsLeapYear(year int) bool {
	return year%4 == 0 && (year%100 != 0 || year%400 == 0)
}