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

    #define DEFINE_NTH_METHOD(prefix, n, fromEnd) \
        date scheduler::prefix##_##n##_##fromEnd() const { \
            return nthwday(wd_enum::prefix, n, fromEnd); \
        }

    #define DEFINE_NTH_METHODS(prefix) \
        DEFINE_NTH_METHOD(prefix, 1, false) \
        DEFINE_NTH_METHOD(prefix, 2, false) \
        DEFINE_NTH_METHOD(prefix, 3, false) \
        DEFINE_NTH_METHOD(prefix, 4, false) \
        DEFINE_NTH_METHOD(prefix, 1, true)

    DEFINE_NTH_METHODS(Monday)
    DEFINE_NTH_METHODS(Tuesday)
    DEFINE_NTH_METHODS(Wednesday)
    DEFINE_NTH_METHODS(Thursday)
    DEFINE_NTH_METHODS(Friday)
    DEFINE_NTH_METHODS(Saturday)
    DEFINE_NTH_METHODS(Sunday)

    #undef DEFINE_TEENTH_METHOD
    #undef DEFINE_NTH_METHOD
    #undef DEFINE_NTH_METHODS

}  // namespace meetup