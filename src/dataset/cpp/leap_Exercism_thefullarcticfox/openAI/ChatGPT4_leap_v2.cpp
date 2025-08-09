#include "leap.h"

namespace leap {
	bool is_leap_year(int year) {
		if (year & 3) return false;
		if (year % 25 != 0) return true;
		return year % 16 == 0;
	}
}  // namespace leap