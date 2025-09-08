#include "meetup.h"

namespace meetup
{

	scheduler::scheduler(months_of_year m, int y) : month(m), year(y) { }

	date scheduler::teenth(boost::date_time::weekdays day) const
	{
		auto d = date(year, month, 13);
		int current_day = d.day_of_week().as_number();
		int target_day = day.as_number();
		int days_to_add = (target_day - current_day + 7) % 7;
		return d + days(days_to_add);
	}

	date scheduler::nth(boost::date_time::weekdays day, int n) const
	{
		auto first_of_month = date(year, month, 1);
		int current_day = first_of_month.day_of_week().as_number();
		int target_day = day.as_number();
		int days_to_first = (target_day - current_day + 7) % 7;
		return first_of_month + days(days_to_first + (n-1)*7);
	}

	date scheduler::last(boost::date_time::weekdays day) const
	{
		auto last_of_month = date(year, month, 1).end_of_month();
		int current_day = last_of_month.day_of_week().as_number();
		int target_day = day.as_number();
		int days_to_subtract = (current_day - target_day + 7) % 7;
		return last_of_month - days(days_to_subtract);
	}

	date scheduler::monteenth() const { return teenth(Monday); }
	date scheduler::tuesteenth() const { return teenth(Tuesday); }
	date scheduler::wednesteenth() const { return teenth(Wednesday); }
	date scheduler::thursteenth() const { return teenth(Thursday); }
	date scheduler::friteenth() const { return teenth(Friday); }
	date scheduler::saturteenth() const { return teenth(Saturday); }
	date scheduler::sunteenth() const { return teenth(Sunday); }
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
}