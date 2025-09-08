#include "meetup.h"

namespace meetup
{

	scheduler::scheduler(months_of_year m, int y) : month(m), year(y) { }

	date scheduler::teenth(boost::date_time::weekdays day) const
	{
		int offset = (day - date(year, month, 13).day_of_week() + 7) % 7;
		return date(year, month, 13 + offset);
	}

	date scheduler::nth(boost::date_time::weekdays day, int n) const
	{
		int first_day_offset = (day - date(year, month, 1).day_of_week() + 7) % 7;
		return date(year, month, 1 + first_day_offset + (n - 1) * 7);
	}

	date scheduler::last(boost::date_time::weekdays day) const
	{
		date last_day_of_month = date(year, month + 1, 1) - days(1);
		int offset = (last_day_of_month.day_of_week() - day + 7) % 7;
		return last_day_of_month - days(offset);
	}

#define DEFINE_TEENTH(day) date scheduler::day##teenth() const { return teenth(day); }
	DEFINE_TEENTH(Monday)
	DEFINE_TEENTH(Tuesday)
	DEFINE_TEENTH(Wednesday)
	DEFINE_TEENTH(Thursday)
	DEFINE_TEENTH(Friday)
	DEFINE_TEENTH(Saturday)
	DEFINE_TEENTH(Sunday)
#undef DEFINE_TEENTH

#define DEFINE_NTH(day, n) date scheduler::n##_##day() const { return nth(day, n); }
#define DEFINE_FIRST(day) DEFINE_NTH(day, first)
#define DEFINE_SECOND(day) DEFINE_NTH(day, second)
#define DEFINE_THIRD(day) DEFINE_NTH(day, third)
#define DEFINE_FOURTH(day) DEFINE_NTH(day, fourth)

	DEFINE_FIRST(Monday)
	DEFINE_FIRST(Tuesday)
	DEFINE_FIRST(Wednesday)
	DEFINE_FIRST(Thursday)
	DEFINE_FIRST(Friday)
	DEFINE_FIRST(Saturday)
	DEFINE_FIRST(Sunday)

	DEFINE_SECOND(Monday)
	DEFINE_SECOND(Tuesday)
	DEFINE_SECOND(Wednesday)
	DEFINE_SECOND(Thursday)
	DEFINE_SECOND(Friday)
	DEFINE_SECOND(Saturday)
	DEFINE_SECOND(Sunday)

	DEFINE_THIRD(Monday)
	DEFINE_THIRD(Tuesday)
	DEFINE_THIRD(Wednesday)
	DEFINE_THIRD(Thursday)
	DEFINE_THIRD(Friday)
	DEFINE_THIRD(Saturday)
	DEFINE_THIRD(Sunday)

	DEFINE_FOURTH(Monday)
	DEFINE_FOURTH(Tuesday)
	DEFINE_FOURTH(Wednesday)
	DEFINE_FOURTH(Thursday)
	DEFINE_FOURTH(Friday)
	DEFINE_FOURTH(Saturday)
	DEFINE_FOURTH(Sunday)

#undef DEFINE_FIRST
#undef DEFINE_SECOND
#undef DEFINE_THIRD
#undef DEFINE_FOURTH
#undef DEFINE_NTH

#define DEFINE_LAST(day) date scheduler::last_##day() const { return last(day); }
	DEFINE_LAST(Monday)
	DEFINE_LAST(Tuesday)
	DEFINE_LAST(Wednesday)
	DEFINE_LAST(Thursday)
	DEFINE_LAST(Friday)
	DEFINE_LAST(Saturday)
	DEFINE_LAST(Sunday)
#undef DEFINE_LAST

}