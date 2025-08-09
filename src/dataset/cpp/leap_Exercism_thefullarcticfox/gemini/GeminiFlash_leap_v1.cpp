#include "leap.h"

namespace leap {
	bool	is_leap_year(int year) {
		// Optimized check for divisibility by 4 using bitwise AND,
		// which is generally faster than the modulo operator for powers of 2.
		// A number is divisible by 4 if its last two bits are 0.
		// (year & 3) == 0 is equivalent to year % 4 == 0.
		return ((year & 3) == 0 && (year % 100 != 0 || year % 400 == 0));
	}
}  // namespace leap