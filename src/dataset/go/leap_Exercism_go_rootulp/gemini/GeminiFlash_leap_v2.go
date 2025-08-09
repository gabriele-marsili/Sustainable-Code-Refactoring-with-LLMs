package leap

func IsLeapYear(year int) bool {
	// A year is a leap year if it is divisible by 4, unless it is divisible by 100 but not by 400.
	// This can be expressed as a single boolean logic:
	// (year % 4 == 0 AND year % 100 != 0) OR (year % 400 == 0)

	// For checking divisibility by 4 (a power of 2), a bitwise AND operation
	// (year & 3 == 0) is generally more performant than the modulo operator (year % 4 == 0).
	// This micro-optimization reduces CPU cycles and thus energy consumption for this common check.
	return ((year&3 == 0) && (year%100 != 0)) || (year%400 == 0)
}