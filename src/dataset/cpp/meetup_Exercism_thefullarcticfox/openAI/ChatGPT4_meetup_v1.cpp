#include "meetup.h"
#include <stdexcept>

namespace meetup {
    scheduler::scheduler(const months_of_year& month, int year) :
        _month(month), _year(year) {}

    date scheduler::teenth(wd_enum weekday) const {
        date day(_year, _month, 13); // Start from the 13th, the earliest "teenth" day
        int offset = (weekday - day.day_of_week().as_enum() + 7) % 7;
        return day + date_duration(offset);
    }

    date scheduler::nthwday(wd_enum weekday, int n, bool fromEnd) const {
        if (n <= 0)
            throw std::invalid_argument("scheduler::nthwday(): bad number of day");

        date day = fromEnd ? date(_year, _month, 1).end_of_month() : date(_year, _month, 1);
        int offset = (weekday - day.day_of_week().as_enum() + 7) % 7;

        if (fromEnd) {
            day -= date_duration(offset);
            day -= date_duration(7 * (n - 1));
        } else {
            day += date_duration(offset);
            day += date_duration(7 * (n - 1));
        }

        if (day.month() != _month)
            throw std::out_of_range("scheduler::nthwday(): day out of range");

        return day;
    }

    #define DEFINE_TEENTH_METHOD(day) \
        date scheduler::day##teenth() const { return teenth(wd_enum::day); }

    DEFINE_TEENTH_METHOD(Monday)
    DEFINE_TEENTH_METHOD(Tuesday)
    DEFINE_TEENTH_METHOD(Wednesday)
    DEFINE_TEENTH_METHOD(Thursday)
    DEFINE_TEENTH_METHOD(Friday)
    DEFINE_TEENTH_METHOD(Saturday)
    DEFINE_TEENTH_METHOD(Sunday)

    #define DEFINE_NTH_METHOD(prefix, n) \
        date scheduler::prefix##_monday() const { return nthwday(wd_enum::Monday, n); } \
        date scheduler::prefix##_tuesday() const { return nthwday(wd_enum::Tuesday, n); } \
        date scheduler::prefix##_wednesday() const { return nthwday(wd_enum::Wednesday, n); } \
        date scheduler::prefix##_thursday() const { return nthwday(wd_enum::Thursday, n); } \
        date scheduler::prefix##_friday() const { return nthwday(wd_enum::Friday, n); } \
        date scheduler::prefix##_saturday() const { return nthwday(wd_enum::Saturday, n); } \
        date scheduler::prefix##_sunday() const { return nthwday(wd_enum::Sunday, n); }

    DEFINE_NTH_METHOD(first, 1)
    DEFINE_NTH_METHOD(second, 2)
    DEFINE_NTH_METHOD(third, 3)
    DEFINE_NTH_METHOD(fourth, 4)

    #define DEFINE_LAST_METHOD(day) \
        date scheduler::last_##day() const { return nthwday(wd_enum::day, 1, true); }

    DEFINE_LAST_METHOD(Monday)
    DEFINE_LAST_METHOD(Tuesday)
    DEFINE_LAST_METHOD(Wednesday)
    DEFINE_LAST_METHOD(Thursday)
    DEFINE_LAST_METHOD(Friday)
    DEFINE_LAST_METHOD(Saturday)
    DEFINE_LAST_METHOD(Sunday)

}  // namespace meetup