#include "meetup.h"
#include <stdexcept>
#include <array>

namespace meetup {
    scheduler::scheduler(const months_of_year& month, int year) :
        _month(month), _year(year) {}

    date scheduler::teenth(wd_enum weekday) const {
        date day(_year, _month, 13);
        int current_weekday = day.day_of_week().as_enum();
        int target_weekday = static_cast<int>(weekday);
        int days_to_add = (target_weekday - current_weekday + 7) % 7;
        return day + date_duration(days_to_add);
    }

    date scheduler::nthwday(wd_enum weekday, int n, bool fromEnd) const {
        if (n <= 0)
            throw std::invalid_argument("scheduler::nthwday(): bad number of day");

        date day(_year, _month, fromEnd ? date(_year, _month, 1).end_of_month().day() : 1);
        
        int current_weekday = day.day_of_week().as_enum();
        int target_weekday = static_cast<int>(weekday);
        
        int days_offset;
        if (fromEnd) {
            days_offset = (current_weekday - target_weekday + 7) % 7;
            day -= date_duration(days_offset + (n - 1) * 7);
        } else {
            days_offset = (target_weekday - current_weekday + 7) % 7;
            day += date_duration(days_offset + (n - 1) * 7);
        }
        
        return day;
    }

    static constexpr std::array<wd_enum, 7> weekdays = {
        wd_enum::Monday, wd_enum::Tuesday, wd_enum::Wednesday, wd_enum::Thursday,
        wd_enum::Friday, wd_enum::Saturday, wd_enum::Sunday
    };

    date scheduler::monteenth() const { return teenth(weekdays[0]); }
    date scheduler::tuesteenth() const { return teenth(weekdays[1]); }
    date scheduler::wednesteenth() const { return teenth(weekdays[2]); }
    date scheduler::thursteenth() const { return teenth(weekdays[3]); }
    date scheduler::friteenth() const { return teenth(weekdays[4]); }
    date scheduler::saturteenth() const { return teenth(weekdays[5]); }
    date scheduler::sunteenth() const { return teenth(weekdays[6]); }

    date scheduler::first_monday() const { return nthwday(weekdays[0], 1); }
    date scheduler::first_tuesday() const { return nthwday(weekdays[1], 1); }
    date scheduler::first_wednesday() const { return nthwday(weekdays[2], 1); }
    date scheduler::first_thursday() const { return nthwday(weekdays[3], 1); }
    date scheduler::first_friday() const { return nthwday(weekdays[4], 1); }
    date scheduler::first_saturday() const { return nthwday(weekdays[5], 1); }
    date scheduler::first_sunday() const { return nthwday(weekdays[6], 1); }

    date scheduler::second_monday() const { return nthwday(weekdays[0], 2); }
    date scheduler::second_tuesday() const { return nthwday(weekdays[1], 2); }
    date scheduler::second_wednesday() const { return nthwday(weekdays[2], 2); }
    date scheduler::second_thursday() const { return nthwday(weekdays[3], 2); }
    date scheduler::second_friday() const { return nthwday(weekdays[4], 2); }
    date scheduler::second_saturday() const { return nthwday(weekdays[5], 2); }
    date scheduler::second_sunday() const { return nthwday(weekdays[6], 2); }

    date scheduler::third_monday() const { return nthwday(weekdays[0], 3); }
    date scheduler::third_tuesday() const { return nthwday(weekdays[1], 3); }
    date scheduler::third_wednesday() const { return nthwday(weekdays[2], 3); }
    date scheduler::third_thursday() const { return nthwday(weekdays[3], 3); }
    date scheduler::third_friday() const { return nthwday(weekdays[4], 3); }
    date scheduler::third_saturday() const { return nthwday(weekdays[5], 3); }
    date scheduler::third_sunday() const { return nthwday(weekdays[6], 3); }

    date scheduler::fourth_monday() const { return nthwday(weekdays[0], 4); }
    date scheduler::fourth_tuesday() const { return nthwday(weekdays[1], 4); }
    date scheduler::fourth_wednesday() const { return nthwday(weekdays[2], 4); }
    date scheduler::fourth_thursday() const { return nthwday(weekdays[3], 4); }
    date scheduler::fourth_friday() const { return nthwday(weekdays[4], 4); }
    date scheduler::fourth_saturday() const { return nthwday(weekdays[5], 4); }
    date scheduler::fourth_sunday() const { return nthwday(weekdays[6], 4); }

    date scheduler::last_monday() const { return nthwday(weekdays[0], 1, true); }
    date scheduler::last_tuesday() const { return nthwday(weekdays[1], 1, true); }
    date scheduler::last_wednesday() const { return nthwday(weekdays[2], 1, true); }
    date scheduler::last_thursday() const { return nthwday(weekdays[3], 1, true); }
    date scheduler::last_friday() const { return nthwday(weekdays[4], 1, true); }
    date scheduler::last_saturday() const { return nthwday(weekdays[5], 1, true); }
    date scheduler::last_sunday() const { return nthwday(weekdays[6], 1, true); }

}  // namespace meetup