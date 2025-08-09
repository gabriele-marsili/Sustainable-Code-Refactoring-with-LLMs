package leap

// TestVersion is the version test suite the program is designed to pass.
const TestVersion = 1

/*
IsLeapYear determines if a year is a leap year according the following rule:
Leap years are evenly divisble by 4 and not by 100
unless also divisible by 400.
*/
func IsLeapYear(year int) bool {
	// The original logic is already quite efficient due to Go's short-circuiting
	// for `&&` and `||` operators, which minimizes the number of modulo
	// operations performed.
	//
	// The primary optimization here is replacing `year % 4 == 0` with
	// `(year & 3) == 0`. For powers of two, the modulo operation `X % 2^N == 0`
	// can be replaced by a bitwise AND `(X & (2^N - 1)) == 0`.
	// This is a common micro-optimization as bitwise operations are typically
	// faster than division/modulo operations, potentially reducing CPU cycles
	// and thus energy consumption for the most frequent check.
	return (year&3) == 0 && (year%100 != 0 || year%400 == 0)
}