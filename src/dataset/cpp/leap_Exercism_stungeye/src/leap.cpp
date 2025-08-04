#include "leap.h"

namespace leap
{
	bool evenly_divisible_by(const int value, const int divisor)
	{
		return value % divisor == 0;
	}

	bool is_leap_year(const int year)
	{
		return evenly_divisible_by(year, 4)
			&& (evenly_divisible_by(year, 400)
				|| !evenly_divisible_by(year, 100));
	}
} // namespace leap
