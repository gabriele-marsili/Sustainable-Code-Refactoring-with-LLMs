#include "meetup.h"

using namespace boost::gregorian;

namespace meetup {

    scheduler::scheduler(int month, int year)
        : refMonth(month), refYear(year) {}

    date scheduler::teenth_generic(boost::date_time::weekdays day) const {
        date tmp(this->refYear, this->refMonth, 13);
        int offset = (day - tmp.day_of_week() + 7) % 7;
        return tmp + date_duration(offset);
    }

    date scheduler::nth_generic(int n, boost::date_time::weekdays day) const {
        date tmp(this->refYear, this->refMonth, 1);
        int offset = (day - tmp.day_of_week() + 7) % 7;
        return tmp + date_duration(offset + (n - 1) * 7);
    }

    date scheduler::last_generic(boost::date_time::weekdays day) const {
        date tmp = date(this->refYear, this->refMonth, 1).end_of_month();
        int offset = (tmp.day_of_week() - day + 7) % 7;
        return tmp - date_duration(offset);
    }

    #define DEFINE_TEENTH_METHOD(day) \
        date scheduler::day##teenth() const { return teenth_generic(day); }

    DEFINE_TEENTH_METHOD(Mon)
    DEFINE_TEENTH_METHOD(Tues)
    DEFINE_TEENTH_METHOD(Wednes)
    DEFINE_TEENTH_METHOD(Thurs)
    DEFINE_TEENTH_METHOD(Fri)
    DEFINE_TEENTH_METHOD(Satur)
    DEFINE_TEENTH_METHOD(Sun)

    #define DEFINE_NTH_METHOD(n, nth) \
        date scheduler::nth##_monday() const { return nth_generic(n, Monday); } \
        date scheduler::nth##_tuesday() const { return nth_generic(n, Tuesday); } \
        date scheduler::nth##_wednesday() const { return nth_generic(n, Wednesday); } \
        date scheduler::nth##_thursday() const { return nth_generic(n, Thursday); } \
        date scheduler::nth##_friday() const { return nth_generic(n, Friday); } \
        date scheduler::nth##_saturday() const { return nth_generic(n, Saturday); } \
        date scheduler::nth##_sunday() const { return nth_generic(n, Sunday); }

    DEFINE_NTH_METHOD(1, first)
    DEFINE_NTH_METHOD(2, second)
    DEFINE_NTH_METHOD(3, third)
    DEFINE_NTH_METHOD(4, fourth)

    #define DEFINE_LAST_METHOD(day) \
        date scheduler::last_##day() const { return last_generic(day); }

    DEFINE_LAST_METHOD(monday)
    DEFINE_LAST_METHOD(tuesday)
    DEFINE_LAST_METHOD(wednesday)
    DEFINE_LAST_METHOD(thursday)
    DEFINE_LAST_METHOD(friday)
    DEFINE_LAST_METHOD(saturday)
    DEFINE_LAST_METHOD(sunday)
}