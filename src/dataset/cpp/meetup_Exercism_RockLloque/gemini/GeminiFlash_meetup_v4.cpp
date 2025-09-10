#include "meetup.h"

namespace meetup {

boost::gregorian::date scheduler::teenth_day(boost::date_time::weekdays const& d) const {
    static const int teenth_start = 13;
    boost::gregorian::date date(year_, month_, teenth_start);
    boost::gregorian::date::day_of_week_type day_of_week = date.day_of_week();

    int days_to_add = (d - day_of_week + 7) % 7;
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

boost::gregorian::date scheduler::first_day(boost::date_time::weekdays const& d) const {
    boost::gregorian::date date(year_, month_, 1);
    boost::gregorian::date::day_of_week_type day_of_week = date.day_of_week();
    int days_to_add = (d - day_of_week + 7) % 7;
    return date + boost::gregorian::days(days_to_add);
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
    boost::gregorian::date::day_of_week_type day_of_week = last_day_of_month.day_of_week();
    int days_to_subtract = (day_of_week - d + 7) % 7;
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