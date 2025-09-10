#include "meetup.h"

namespace meetup {

boost::gregorian::date scheduler::teenth_day(boost::date_time::weekdays const& d) const {
  static const boost::gregorian::date thirteenth(boost::gregorian::date(boost::gregorian::year_type(2000), boost::gregorian::month_type(1), 13));
  boost::gregorian::date first_day(year_, month_, 1);
  boost::gregorian::first_day_of_the_week_after wday(d);
  boost::gregorian::date candidate = wday.get_date(first_day);
  if (candidate.day() < 13) {
    candidate += boost::gregorian::days(7);
  }
  return candidate;
}

boost::gregorian::date scheduler::monteenth() const {
  return teenth_day(boost::date_time::weekdays::Monday);
}

boost::gregorian::date scheduler::tuesteenth() const {
  return teenth_day(boost::date_time::weekdays::Tuesday);
}

boost::gregorian::date scheduler::wednesteenth() const {
  return teenth_day(boost::date_time::weekdays::Wednesday);
}

boost::gregorian::date scheduler::thursteenth() const {
  return teenth_day(boost::date_time::weekdays::Thursday);
}

boost::gregorian::date scheduler::friteenth() const {
  return teenth_day(boost::date_time::weekdays::Friday);
}

boost::gregorian::date scheduler::saturteenth() const {
  return teenth_day(boost::date_time::weekdays::Saturday);
}

boost::gregorian::date scheduler::sunteenth() const {
  return teenth_day(boost::date_time::weekdays::Sunday);
}

boost::gregorian::date scheduler::first_day(boost::date_time::weekdays const& d) const {
    boost::gregorian::date first_of_month(year_, month_, 1);
    boost::date_time::weekday first_day_of_week = first_of_month.day_of_week();
    int day_difference = (d - first_day_of_week + 7) % 7;
    return first_of_month + boost::gregorian::days(day_difference);
}

boost::gregorian::date scheduler::first_monday() const {
  return first_day(boost::date_time::weekdays::Monday);
}

boost::gregorian::date scheduler::first_tuesday() const {
  return first_day(boost::date_time::weekdays::Tuesday);
}

boost::gregorian::date scheduler::first_wednesday() const {
  return first_day(boost::date_time::weekdays::Wednesday);
}

boost::gregorian::date scheduler::first_thursday() const {
  return first_day(boost::date_time::weekdays::Thursday);
}

boost::gregorian::date scheduler::first_friday() const {
  return first_day(boost::date_time::weekdays::Friday);
}

boost::gregorian::date scheduler::first_saturday() const {
  return first_day(boost::date_time::weekdays::Saturday);
}

boost::gregorian::date scheduler::first_sunday() const {
  return first_day(boost::date_time::weekdays::Sunday);
}

boost::gregorian::date scheduler::second_monday() const {
  return first_monday() + boost::gregorian::days(7);
}

boost::gregorian::date scheduler::second_tuesday() const {
  return first_tuesday() + boost::gregorian::days(7);
}

boost::gregorian::date scheduler::second_wednesday() const {
  return first_wednesday() + boost::gregorian::days(7);
}

boost::gregorian::date scheduler::second_thursday() const {
  return first_thursday() + boost::gregorian::days(7);
}

boost::gregorian::date scheduler::second_friday() const {
  return first_friday() + boost::gregorian::days(7);
}

boost::gregorian::date scheduler::second_saturday() const {
  return first_saturday() + boost::gregorian::days(7);
}

boost::gregorian::date scheduler::second_sunday() const {
  return first_sunday() + boost::gregorian::days(7);
}

boost::gregorian::date scheduler::third_monday() const {
  return first_monday() + boost::gregorian::days(14);
}

boost::gregorian::date scheduler::third_tuesday() const {
  return first_tuesday() + boost::gregorian::days(14);
}

boost::gregorian::date scheduler::third_wednesday() const {
  return first_wednesday() + boost::gregorian::days(14);
}

boost::gregorian::date scheduler::third_thursday() const {
  return first_thursday() + boost::gregorian::days(14);
}

boost::gregorian::date scheduler::third_friday() const {
  return first_friday() + boost::gregorian::days(14);
}

boost::gregorian::date scheduler::third_saturday() const {
  return first_saturday() + boost::gregorian::days(14);
}

boost::gregorian::date scheduler::third_sunday() const {
  return first_sunday() + boost::gregorian::days(14);
}

boost::gregorian::date scheduler::fourth_monday() const {
  return first_monday() + boost::gregorian::days(21);
}

boost::gregorian::date scheduler::fourth_tuesday() const {
  return first_tuesday() + boost::gregorian::days(21);
}

boost::gregorian::date scheduler::fourth_wednesday() const {
  return first_wednesday() + boost::gregorian::days(21);
}

boost::gregorian::date scheduler::fourth_thursday() const {
  return first_thursday() + boost::gregorian::days(21);
}

boost::gregorian::date scheduler::fourth_friday() const {
  return first_friday() + boost::gregorian::days(21);
}

boost::gregorian::date scheduler::fourth_saturday() const {
  return first_saturday() + boost::gregorian::days(21);
}

boost::gregorian::date scheduler::fourth_sunday() const {
  return first_sunday() + boost::gregorian::days(21);
}

boost::gregorian::date scheduler::last_day(boost::date_time::weekdays const& d) const {
    boost::gregorian::date last_day_of_month = boost::gregorian::date(year_, month_, boost::gregorian::gregorian_calendar::end_of_month(year_, month_));
    boost::date_time::weekday last_day_of_week = last_day_of_month.day_of_week();
    int day_difference = (last_day_of_week - d + 7) % 7;
    return last_day_of_month - boost::gregorian::days(day_difference);
}

boost::gregorian::date scheduler::last_monday() const {
  return last_day(boost::date_time::weekdays::Monday);
}

boost::gregorian::date scheduler::last_tuesday() const {
  return last_day(boost::date_time::weekdays::Tuesday);
}

boost::gregorian::date scheduler::last_wednesday() const {
  return last_day(boost::date_time::weekdays::Wednesday);
}

boost::gregorian::date scheduler::last_thursday() const {
  return last_day(boost::date_time::weekdays::Thursday);
}

boost::gregorian::date scheduler::last_friday() const {
  return last_day(boost::date_time::weekdays::Friday);
}

boost::gregorian::date scheduler::last_saturday() const {
  return last_day(boost::date_time::weekdays::Saturday);
}

boost::gregorian::date scheduler::last_sunday() const {
  return last_day(boost::date_time::weekdays::Sunday);
}

}  // namespace meetup