#include "meetup.h"

namespace meetup {

boost::gregorian::date scheduler::teenth_day(boost::date_time::weekdays const& d) const {
  static const int teenth_start = 13;
  boost::gregorian::date date(year_, month_, teenth_start);
  boost::date_time::weekdays date_weekday = date.day_of_week();

  int days_to_add = (d - date_weekday + 7) % 7;
  return date + boost::gregorian::days(days_to_add);
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

boost::gregorian::date scheduler::nth_weekday(int n, boost::date_time::weekdays const& d) const {
    boost::gregorian::date first_of_month(year_, month_, 1);
    boost::date_time::weekdays first_day_weekday = first_of_month.day_of_week();
    int days_to_add = (d - first_day_weekday + 7) % 7;

    boost::gregorian::date result = first_of_month + boost::gregorian::days(days_to_add + (n - 1) * 7);
    return result;
}

boost::gregorian::date scheduler::first_monday() const {
    return nth_weekday(1, boost::date_time::weekdays::Monday);
}

boost::gregorian::date scheduler::first_tuesday() const {
    return nth_weekday(1, boost::date_time::weekdays::Tuesday);
}

boost::gregorian::date scheduler::first_wednesday() const {
    return nth_weekday(1, boost::date_time::weekdays::Wednesday);
}

boost::gregorian::date scheduler::first_thursday() const {
    return nth_weekday(1, boost::date_time::weekdays::Thursday);
}

boost::gregorian::date scheduler::first_friday() const {
    return nth_weekday(1, boost::date_time::weekdays::Friday);
}

boost::gregorian::date scheduler::first_saturday() const {
    return nth_weekday(1, boost::date_time::weekdays::Saturday);
}

boost::gregorian::date scheduler::first_sunday() const {
    return nth_weekday(1, boost::date_time::weekdays::Sunday);
}

boost::gregorian::date scheduler::second_monday() const {
    return nth_weekday(2, boost::date_time::weekdays::Monday);
}

boost::gregorian::date scheduler::second_tuesday() const {
    return nth_weekday(2, boost::date_time::weekdays::Tuesday);
}

boost::gregorian::date scheduler::second_wednesday() const {
    return nth_weekday(2, boost::date_time::weekdays::Wednesday);
}

boost::gregorian::date scheduler::second_thursday() const {
    return nth_weekday(2, boost::date_time::weekdays::Thursday);
}

boost::gregorian::date scheduler::second_friday() const {
    return nth_weekday(2, boost::date_time::weekdays::Friday);
}

boost::gregorian::date scheduler::second_saturday() const {
    return nth_weekday(2, boost::date_time::weekdays::Saturday);
}

boost::gregorian::date scheduler::second_sunday() const {
    return nth_weekday(2, boost::date_time::weekdays::Sunday);
}

boost::gregorian::date scheduler::third_monday() const {
    return nth_weekday(3, boost::date_time::weekdays::Monday);
}

boost::gregorian::date scheduler::third_tuesday() const {
    return nth_weekday(3, boost::date_time::weekdays::Tuesday);
}

boost::gregorian::date scheduler::third_wednesday() const {
    return nth_weekday(3, boost::date_time::weekdays::Wednesday);
}

boost::gregorian::date scheduler::third_thursday() const {
    return nth_weekday(3, boost::date_time::weekdays::Thursday);
}

boost::gregorian::date scheduler::third_friday() const {
    return nth_weekday(3, boost::date_time::weekdays::Friday);
}

boost::gregorian::date scheduler::third_saturday() const {
    return nth_weekday(3, boost::date_time::weekdays::Saturday);
}

boost::gregorian::date scheduler::third_sunday() const {
    return nth_weekday(3, boost::date_time::weekdays::Sunday);
}

boost::gregorian::date scheduler::fourth_monday() const {
    return nth_weekday(4, boost::date_time::weekdays::Monday);
}

boost::gregorian::date scheduler::fourth_tuesday() const {
    return nth_weekday(4, boost::date_time::weekdays::Tuesday);
}

boost::gregorian::date scheduler::fourth_wednesday() const {
    return nth_weekday(4, boost::date_time::weekdays::Wednesday);
}

boost::gregorian::date scheduler::fourth_thursday() const {
    return nth_weekday(4, boost::date_time::weekdays::Thursday);
}

boost::gregorian::date scheduler::fourth_friday() const {
    return nth_weekday(4, boost::date_time::weekdays::Friday);
}

boost::gregorian::date scheduler::fourth_saturday() const {
    return nth_weekday(4, boost::date_time::weekdays::Saturday);
}

boost::gregorian::date scheduler::fourth_sunday() const {
    return nth_weekday(4, boost::date_time::weekdays::Sunday);
}

boost::gregorian::date scheduler::last_day(boost::date_time::weekdays const& d) const {
    boost::gregorian::date last_day_of_month = boost::gregorian::date(year_, month_, boost::gregorian::gregorian_calendar::end_of_month(year_, month_));
    boost::date_time::weekdays last_day_weekday = last_day_of_month.day_of_week();

    int days_to_subtract = (last_day_weekday - d + 7) % 7;
    return last_day_of_month - boost::gregorian::days(days_to_subtract);
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

} // namespace meetup