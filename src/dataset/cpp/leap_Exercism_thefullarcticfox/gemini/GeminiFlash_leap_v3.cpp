#include "leap.h"

namespace leap {
	bool is_leap_year(int year) {
		// A year is a leap year if it is divisible by 4
		// but not by 100, unless it is also divisible by 400.

		// Optimized check for divisibility by 4 using bitwise AND.
		// This is generally faster than the modulo operator for powers of 2.
		if ((year & 3) != 0) { // Equivalent to (year % 4 != 0)
			return false;
		}

		// If divisible by 4, check for century years.
		// If not divisible by 100, it is a leap year (e.g., 2004).
		if ((year % 100) != 0) {
			return true;
		}

		// If divisible by 4 and by 100, it must also be divisible by 400
		// to be a leap year (e.g., 2000 vs 1900).
		return (year % 400 == 0);
	}
}  // namespace leap