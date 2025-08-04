#include "meetup.h"
#include <stdexcept>

namespace meetup {
	scheduler::scheduler(const months_of_year& month, int year) :
		_month(month), _year(year) {}

	date	scheduler::teenth(wd_enum weekday) const {
		date	day(_year, _month, 19);
		while (day.day_of_week().as_enum() != weekday)
			day -= date_duration(1);
		return (day);
	}

	date	scheduler::nthwday(wd_enum weekday, int n, bool fromEnd) const {
		if (n <= 0)
			throw std::invalid_argument("scheduler::nthwday(): bad number of day");

		date	day(_year, _month, 1);
		if (fromEnd)
			day = day.end_of_month();

		//	find day of the week
		while (day.month() == _month && day.day_of_week().as_enum() != weekday) {
			if (fromEnd)
				day -= date_duration(1);
			else
				day += date_duration(1);
		}

		//	add or remove weeks n times
		while (--n && day.month() == _month) {
			if (fromEnd)
				day -= date_duration(7);
			else
				day += date_duration(7);
		}

		return (day);
	}

	date	scheduler::monteenth() const {
		return (teenth(wd_enum::Monday));
	}

	date	scheduler::tuesteenth() const {
		return (teenth(wd_enum::Tuesday));
	}

	date	scheduler::wednesteenth() const {
		return (teenth(wd_enum::Wednesday));
	}

	date	scheduler::thursteenth() const {
		return (teenth(wd_enum::Thursday));
	}

	date	scheduler::friteenth() const {
		return (teenth(wd_enum::Friday));
	}

	date	scheduler::saturteenth() const {
		return (teenth(wd_enum::Saturday));
	}

	date	scheduler::sunteenth() const {
		return (teenth(wd_enum::Sunday));
	}

	date	scheduler::first_monday() const {
		return (nthwday(wd_enum::Monday, 1));
	}

	date	scheduler::first_tuesday() const {
		return (nthwday(wd_enum::Tuesday, 1));
	}

	date	scheduler::first_wednesday() const {
		return (nthwday(wd_enum::Wednesday, 1));
	}

	date	scheduler::first_thursday() const {
		return (nthwday(wd_enum::Thursday, 1));
	}

	date	scheduler::first_friday() const {
		return (nthwday(wd_enum::Friday, 1));
	}

	date	scheduler::first_saturday() const {
		return (nthwday(wd_enum::Saturday, 1));
	}

	date	scheduler::first_sunday() const {
		return (nthwday(wd_enum::Sunday, 1));
	}

	date	scheduler::second_monday() const {
		return (nthwday(wd_enum::Monday, 2));
	}

	date	scheduler::second_tuesday() const {
		return (nthwday(wd_enum::Tuesday, 2));
	}

	date	scheduler::second_wednesday() const {
		return (nthwday(wd_enum::Wednesday, 2));
	}

	date	scheduler::second_thursday() const {
		return (nthwday(wd_enum::Thursday, 2));
	}

	date	scheduler::second_friday() const {
		return (nthwday(wd_enum::Friday, 2));
	}

	date	scheduler::second_saturday() const {
		return (nthwday(wd_enum::Saturday, 2));
	}

	date	scheduler::second_sunday() const {
		return (nthwday(wd_enum::Sunday, 2));
	}

	date	scheduler::third_monday() const {
		return (nthwday(wd_enum::Monday, 3));
	}

	date	scheduler::third_tuesday() const {
		return (nthwday(wd_enum::Tuesday, 3));
	}

	date	scheduler::third_wednesday() const {
		return (nthwday(wd_enum::Wednesday, 3));
	}

	date	scheduler::third_thursday() const {
		return (nthwday(wd_enum::Thursday, 3));
	}

	date	scheduler::third_friday() const {
		return (nthwday(wd_enum::Friday, 3));
	}

	date	scheduler::third_saturday() const {
		return (nthwday(wd_enum::Saturday, 3));
	}

	date	scheduler::third_sunday() const {
		return (nthwday(wd_enum::Sunday, 3));
	}

	date	scheduler::fourth_monday() const {
		return (nthwday(wd_enum::Monday, 4));
	}

	date	scheduler::fourth_tuesday() const {
		return (nthwday(wd_enum::Tuesday, 4));
	}

	date	scheduler::fourth_wednesday() const {
		return (nthwday(wd_enum::Wednesday, 4));
	}

	date	scheduler::fourth_thursday() const {
		return (nthwday(wd_enum::Thursday, 4));
	}

	date	scheduler::fourth_friday() const {
		return (nthwday(wd_enum::Friday, 4));
	}

	date	scheduler::fourth_saturday() const {
		return (nthwday(wd_enum::Saturday, 4));
	}

	date	scheduler::fourth_sunday() const {
		return (nthwday(wd_enum::Sunday, 4));
	}

	date	scheduler::last_monday() const {
		return (nthwday(wd_enum::Monday, 1, true));
	}

	date	scheduler::last_tuesday() const {
		return (nthwday(wd_enum::Tuesday, 1, true));
	}

	date	scheduler::last_wednesday() const {
		return (nthwday(wd_enum::Wednesday, 1, true));
	}

	date	scheduler::last_thursday() const {
		return (nthwday(wd_enum::Thursday, 1, true));
	}

	date	scheduler::last_friday() const {
		return (nthwday(wd_enum::Friday, 1, true));
	}

	date	scheduler::last_saturday() const {
		return (nthwday(wd_enum::Saturday, 1, true));
	}

	date	scheduler::last_sunday() const {
		return (nthwday(wd_enum::Sunday, 1, true));
	}


}  // namespace meetup
