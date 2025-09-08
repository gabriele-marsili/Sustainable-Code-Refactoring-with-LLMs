#include "meetup.h"

namespace meetup
{

	scheduler::scheduler(months_of_year m, int y) : month(m), year(y) { }

	date scheduler::teenth(boost::date_time::weekdays day) const
	{
		auto d = date(year, month, 13);
		int days_to_add = (day - d.day_of_week() + 7) % 7;
		return d + days(days_to_add);
	}

	date scheduler::nth(boost::date_time::weekdays day, int n) const
	{
		return first_day_of_the_week_in_month(day, month).get_date(year) + days((n-1)*7);
	}

	date scheduler::last(boost::date_time::weekdays day) const
	{
		return last_day_of_the_week_in_month(day, month).get_date(year);
	}

	#define DEFINE_TEENTH_METHOD(name, day) \
		date scheduler::name##teenth() const { return teenth(day); }

	#define DEFINE_NTH_METHOD(name, day, n) \
		date scheduler::name##_##n() const { return nth(day, n); }

	#define DEFINE_LAST_METHOD(name, day) \
		date scheduler::last_##name() const { return last(day); }

	DEFINE_TEENTH_METHOD(mon, Monday)
	DEFINE_TEENTH_METHOD(tues, Tuesday)
	DEFINE_TEENTH_METHOD(wednes, Wednesday)
	DEFINE_TEENTH_METHOD(thurs, Thursday)
	DEFINE_TEENTH_METHOD(fri, Friday)
	DEFINE_TEENTH_METHOD(satur, Saturday)
	DEFINE_TEENTH_METHOD(sun, Sunday)

	DEFINE_NTH_METHOD(first, monday, 1)
	DEFINE_NTH_METHOD(first, tuesday, 1)
	DEFINE_NTH_METHOD(first, wednesday, 1)
	DEFINE_NTH_METHOD(first, thursday, 1)
	DEFINE_NTH_METHOD(first, friday, 1)
	DEFINE_NTH_METHOD(first, saturday, 1)
	DEFINE_NTH_METHOD(first, sunday, 1)

	date scheduler::first_monday() const { return nth(Monday, 1); }
	date scheduler::first_tuesday() const { return nth(Tuesday, 1); }
	date scheduler::first_wednesday() const { return nth(Wednesday, 1); }
	date scheduler::first_thursday() const { return nth(Thursday, 1); }
	date scheduler::first_friday() const { return nth(Friday, 1); }
	date scheduler::first_saturday() const { return nth(Saturday, 1); }
	date scheduler::first_sunday() const { return nth(Sunday, 1); }
	date scheduler::second_monday() const { return nth(Monday, 2); }
	date scheduler::second_tuesday() const { return nth(Tuesday, 2); }
	date scheduler::second_wednesday() const { return nth(Wednesday, 2); }
	date scheduler::second_thursday() const { return nth(Thursday, 2); }
	date scheduler::second_friday() const { return nth(Friday, 2); }
	date scheduler::second_saturday() const { return nth(Saturday, 2); }
	date scheduler::second_sunday() const { return nth(Sunday, 2); }
	date scheduler::third_monday() const { return nth(Monday, 3); }
	date scheduler::third_tuesday() const { return nth(Tuesday, 3); }
	date scheduler::third_wednesday() const { return nth(Wednesday, 3); }
	date scheduler::third_thursday() const { return nth(Thursday, 3); }
	date scheduler::third_friday() const { return nth(Friday, 3); }
	date scheduler::third_saturday() const { return nth(Saturday, 3); }
	date scheduler::third_sunday() const { return nth(Sunday, 3); }
	date scheduler::fourth_monday() const { return nth(Monday, 4); }
	date scheduler::fourth_tuesday() const { return nth(Tuesday, 4); }
	date scheduler::fourth_wednesday() const { return nth(Wednesday, 4); }
	date scheduler::fourth_thursday() const { return nth(Thursday, 4); }
	date scheduler::fourth_friday() const { return nth(Friday, 4); }
	date scheduler::fourth_saturday() const { return nth(Saturday, 4); }
	date scheduler::fourth_sunday() const { return nth(Sunday, 4); }
	date scheduler::last_monday() const { return last(Monday); }
	date scheduler::last_tuesday() const { return last(Tuesday); }
	date scheduler::last_wednesday() const { return last(Wednesday); }
	date scheduler::last_thursday() const { return last(Thursday); }
	date scheduler::last_friday() const { return last(Friday); }
	date scheduler::last_saturday() const { return last(Saturday); }
	date scheduler::last_sunday() const { return last(Sunday); }

	#undef DEFINE_TEENTH_METHOD
	#undef DEFINE_NTH_METHOD
	#undef DEFINE_LAST_METHOD
}