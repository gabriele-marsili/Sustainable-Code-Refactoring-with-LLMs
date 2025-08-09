#include "leap.h"

int is_leap_year(const int year)
{
	// Optimized: Replaced 'year % 4 == 0' with '(year & 3) == 0'.
	// For divisibility by powers of 2 (like 4), a bitwise AND operation
	// (year & (power_of_2 - 1)) is generally more efficient than the modulo operator,
	// as it typically translates to fewer CPU cycles. This reduces execution time
	// and consequently lowers energy consumption without altering the original behavior
	// or function signature. The short-circuiting logic of '&&' and '||'
	// is inherently efficient and preserved.
	return (((year & 3) == 0 && year % 100 != 0) || year % 400 == 0);
}