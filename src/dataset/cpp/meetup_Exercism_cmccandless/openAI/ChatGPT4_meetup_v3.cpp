#include "meetup.h"

namespace meetup
{

	scheduler::scheduler(months_of_year m, int y) : month(m), year(y) { }

	date scheduler::teenth(boost::date_time::weekdays day) const
	{
		return first_day_of_the_week_in_month(day, month).get_date(year) + days((13 - 1) / 7 * 7);
	}

	date scheduler::nth(boost::date_time::weekdays day, int n) const
	{
		return first_day_of_the_week_in_month(day, month).get_date(year) + days((n - 1) * 7);
	}

	date scheduler::last(boost::date_time::weekdays day) const
	{
		return last_day_of_the_week_in_month(day, month).get_date(year);
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
#define DEFINE_FIRST(day) date scheduler::first_##day() const { return nth(day, 1); }
	DEFINE_FIRST(Monday)
	DEFINE_FIRST(Tuesday)
	DEFINE_FIRST(Wednesday)
	DEFINE_FIRST(Thursday)
	DEFINE_FIRST(Friday)
	DEFINE_FIRST(Saturday)
	DEFINE_FIRST(Sunday)
	DEFINE_NTH(Monday, second)
	DEFINE_NTH(Tuesday, second)
	DEFINE_NTH(Wednesday, second)
	DEFINE_NTH(Thursday, second)
	DEFINE_NTH(Friday, second)
	DEFINE_NTH(Saturday, second)
	DEFINE_NTH(Sunday, second)
	DEFINE_NTH(Monday, third)
	DEFINE_NTH(Tuesday, third)
	DEFINE_NTH(Wednesday, third)
	DEFINE_NTH(Thursday, third)
	DEFINE_NTH(Friday, third)
	DEFINE_NTH(Saturday, third)
	DEFINE_NTH(Sunday, third)
	DEFINE_NTH(Monday, fourth)
	DEFINE_NTH(Tuesday, fourth)
	DEFINE_NTH(Wednesday, fourth)
	DEFINE_NTH(Thursday, fourth)
	DEFINE_NTH(Friday, fourth)
	DEFINE_NTH(Saturday, fourth)
	DEFINE_NTH(Sunday, fourth)
#undef DEFINE_NTH
#undef DEFINE_FIRST

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