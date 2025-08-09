#include "leap.h"

namespace leap {
	bool is_leap_year(int year) noexcept {
		return (year & 3) == 0 && (year % 100 != 0 || year % 400 == 0);
	}
}  // namespace leap