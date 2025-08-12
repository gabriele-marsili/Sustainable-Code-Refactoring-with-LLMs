// Package leap contains a function for checking if a year is a leap year.
package leap

// IsLeapYear checks if a year is a leap year.
//
// Benchmark  4658377  ~257 ns/op
func IsLeapYear(year int) bool {
	return year&3 == 0 && (year%100 != 0 || year%400 == 0)
}