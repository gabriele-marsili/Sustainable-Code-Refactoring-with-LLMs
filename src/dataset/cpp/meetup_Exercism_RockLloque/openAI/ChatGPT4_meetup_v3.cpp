#include "meetup.h"

namespace meetup {

    boost::gregorian::date scheduler::teenth_day(boost::date_time::weekdays const& d) const {
        return boost::gregorian::first_day_of_the_week_after(d).get_date({year_, month_, 12});
    }

    boost::gregorian::date scheduler::monteenth() const { return teenth_day(boost::date_time::weekdays::Monday); }
    boost::gregorian::date scheduler::tuesteenth() const { return teenth_day(boost::date_time::weekdays::Tuesday); }
    boost::gregorian::date scheduler::wednesteenth() const { return teenth_day(boost::date_time::weekdays::Wednesday); }
    boost::gregorian::date scheduler::thursteenth() const { return teenth_day(boost::date_time::weekdays::Thursday); }
    boost::gregorian::date scheduler::friteenth() const { return teenth_day(boost::date_time::weekdays::Friday); }
    boost::gregorian::date scheduler::saturteenth() const { return teenth_day(boost::date_time::weekdays::Saturday); }
    boost::gregorian::date scheduler::sunteenth() const { return teenth_day(boost::date_time::weekdays::Sunday); }

    boost::gregorian::date scheduler::first_day(boost::date_time::weekdays const& d) const {
        return boost::gregorian::nth_day_of_the_week_in_month(boost::gregorian::nth_day_of_the_week_in_month::first, d, month_).get_date(year_);
    }

    boost::gregorian::date scheduler::first_monday() const { return first_day(boost::date_time::weekdays::Monday); }
    boost::gregorian::date scheduler::first_tuesday() const { return first_day(boost::date_time::weekdays::Tuesday); }
    boost::gregorian::date scheduler::first_wednesday() const { return first_day(boost::date_time::weekdays::Wednesday); }
    boost::gregorian::date scheduler::first_thursday() const { return first_day(boost::date_time::weekdays::Thursday); }
    boost::gregorian::date scheduler::first_friday() const { return first_day(boost::date_time::weekdays::Friday); }
    boost::gregorian::date scheduler::first_saturday() const { return first_day(boost::date_time::weekdays::Saturday); }
    boost::gregorian::date scheduler::first_sunday() const { return first_day(boost::date_time::weekdays::Sunday); }

    boost::gregorian::date scheduler::nth_day_of_week(boost::date_time::weekdays const& d, int n) const {
        return first_day(d) + boost::gregorian::days(7 * (n - 1));
    }

    boost::gregorian::date scheduler::second_monday() const { return nth_day_of_week(boost::date_time::weekdays::Monday, 2); }
    boost::gregorian::date scheduler::second_tuesday() const { return nth_day_of_week(boost::date_time::weekdays::Tuesday, 2); }
    boost::gregorian::date scheduler::second_wednesday() const { return nth_day_of_week(boost::date_time::weekdays::Wednesday, 2); }
    boost::gregorian::date scheduler::second_thursday() const { return nth_day_of_week(boost::date_time::weekdays::Thursday, 2); }
    boost::gregorian::date scheduler::second_friday() const { return nth_day_of_week(boost::date_time::weekdays::Friday, 2); }
    boost::gregorian::date scheduler::second_saturday() const { return nth_day_of_week(boost::date_time::weekdays::Saturday, 2); }
    boost::gregorian::date scheduler::second_sunday() const { return nth_day_of_week(boost::date_time::weekdays::Sunday, 2); }

    boost::gregorian::date scheduler::third_monday() const { return nth_day_of_week(boost::date_time::weekdays::Monday, 3); }
    boost::gregorian::date scheduler::third_tuesday() const { return nth_day_of_week(boost::date_time::weekdays::Tuesday, 3); }
    boost::gregorian::date scheduler::third_wednesday() const { return nth_day_of_week(boost::date_time::weekdays::Wednesday, 3); }
    boost::gregorian::date scheduler::third_thursday() const { return nth_day_of_week(boost::date_time::weekdays::Thursday, 3); }
    boost::gregorian::date scheduler::third_friday() const { return nth_day_of_week(boost::date_time::weekdays::Friday, 3); }
    boost::gregorian::date scheduler::third_saturday() const { return nth_day_of_week(boost::date_time::weekdays::Saturday, 3); }
    boost::gregorian::date scheduler::third_sunday() const { return nth_day_of_week(boost::date_time::weekdays::Sunday, 3); }

    boost::gregorian::date scheduler::fourth_monday() const { return nth_day_of_week(boost::date_time::weekdays::Monday, 4); }
    boost::gregorian::date scheduler::fourth_tuesday() const { return nth_day_of_week(boost::date_time::weekdays::Tuesday, 4); }
    boost::gregorian::date scheduler::fourth_wednesday() const { return nth_day_of_week(boost::date_time::weekdays::Wednesday, 4); }
    boost::gregorian::date scheduler::fourth_thursday() const { return nth_day_of_week(boost::date_time::weekdays::Thursday, 4); }
    boost::gregorian::date scheduler::fourth_friday() const { return nth_day_of_week(boost::date_time::weekdays::Friday, 4); }
    boost::gregorian::date scheduler::fourth_saturday() const { return nth_day_of_week(boost::date_time::weekdays::Saturday, 4); }
    boost::gregorian::date scheduler::fourth_sunday() const { return nth_day_of_week(boost::date_time::weekdays::Sunday, 4); }

    boost::gregorian::date scheduler::last_day(boost::date_time::weekdays const& d) const {
        return boost::gregorian::last_day_of_the_week_in_month(d, month_).get_date(year_);
    }

    boost::gregorian::date scheduler::last_monday() const { return last_day(boost::date_time::weekdays::Monday); }
    boost::gregorian::date scheduler::last_tuesday() const { return last_day(boost::date_time::weekdays::Tuesday); }
    boost::gregorian::date scheduler::last_wednesday() const { return last_day(boost::date_time::weekdays::Wednesday); }
    boost::gregorian::date scheduler::last_thursday() const { return last_day(boost::date_time::weekdays::Thursday); }
    boost::gregorian::date scheduler::last_friday() const { return last_day(boost::date_time::weekdays::Friday); }
    boost::gregorian::date scheduler::last_saturday() const { return last_day(boost::date_time::weekdays::Saturday); }
    boost::gregorian::date scheduler::last_sunday() const { return last_day(boost::date_time::weekdays::Sunday); }

}