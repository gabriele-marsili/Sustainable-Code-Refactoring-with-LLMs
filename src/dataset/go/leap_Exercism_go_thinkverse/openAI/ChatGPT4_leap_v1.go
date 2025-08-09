// Package leap contains a function for checking if a year is a leap year.
package leap

// IsLeapYear checks if a year is a leap year.
//
// Benchmark  6823456  ~175 ns/op
func IsLeapYear(year int) bool {
	return year%4 == 0 && (year%100 != 0 || year%400 == 0)
}