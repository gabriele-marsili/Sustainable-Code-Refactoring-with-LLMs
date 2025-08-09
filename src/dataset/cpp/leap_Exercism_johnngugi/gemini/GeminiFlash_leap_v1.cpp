#include "leap.h"

bool leap::is_leap_year(int year)
{
	// According to the Gregorian calendar, a year is a leap year if:
	// 1. It is divisible by 4,
	// 2. EXCEPT if it is divisible by 100,
	// 3. UNLESS it is also divisible by 400.
	//
	// This can be expressed as:
	// (year % 4 == 0) AND ((year % 100 != 0) OR (year % 400 == 0))
	//
	// This single boolean expression combines all conditions efficiently,
	// leveraging short-circuiting logic to minimize computations on average.
	// For instance, if 'year % 4' is not 0, the rest of the expression is not evaluated.
	// This approach tends to reduce the average number of modulo operations and
	// branches compared to a sequential 'if-else if' structure, contributing
	// to lower CPU cycles and thus reduced energy consumption, especially
	// for the most common input patterns.
	return (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
}