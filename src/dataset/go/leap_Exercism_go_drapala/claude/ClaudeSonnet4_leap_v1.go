// Calculates if a given year is a leap year
package leap

// Returns true if year is a leap year, otherwise returns false
func IsLeapYear(year int) bool {
	return year%4 == 0 && (year%100 != 0 || year%400 == 0)
}