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

    DEFINE_TEENTH_METHOD(Monday)
    DEFINE_TEENTH_METHOD(Tuesday)
    DEFINE_TEENTH_METHOD(Wednesday)
    DEFINE_TEENTH_METHOD(Thursday)
    DEFINE_TEENTH_METHOD(Friday)
    DEFINE_TEENTH_METHOD(Saturday)
    DEFINE_TEENTH_METHOD(Sunday)

    #define DEFINE_NTH_METHOD(n, day) \
        date scheduler::n##_##day() const { return nth_generic(n, day); }

    DEFINE_NTH_METHOD(first, Monday)
    DEFINE_NTH_METHOD(first, Tuesday)
    DEFINE_NTH_METHOD(first, Wednesday)
    DEFINE_NTH_METHOD(first, Thursday)
    DEFINE_NTH_METHOD(first, Friday)
    DEFINE_NTH_METHOD(first, Saturday)
    DEFINE_NTH_METHOD(first, Sunday)

    DEFINE_NTH_METHOD(second, Monday)
    DEFINE_NTH_METHOD(second, Tuesday)
    DEFINE_NTH_METHOD(second, Wednesday)
    DEFINE_NTH_METHOD(second, Thursday)
    DEFINE_NTH_METHOD(second, Friday)
    DEFINE_NTH_METHOD(second, Saturday)
    DEFINE_NTH_METHOD(second, Sunday)

    DEFINE_NTH_METHOD(third, Monday)
    DEFINE_NTH_METHOD(third, Tuesday)
    DEFINE_NTH_METHOD(third, Wednesday)
    DEFINE_NTH_METHOD(third, Thursday)
    DEFINE_NTH_METHOD(third, Friday)
    DEFINE_NTH_METHOD(third, Saturday)
    DEFINE_NTH_METHOD(third, Sunday)

    DEFINE_NTH_METHOD(fourth, Monday)
    DEFINE_NTH_METHOD(fourth, Tuesday)
    DEFINE_NTH_METHOD(fourth, Wednesday)
    DEFINE_NTH_METHOD(fourth, Thursday)
    DEFINE_NTH_METHOD(fourth, Friday)
    DEFINE_NTH_METHOD(fourth, Saturday)
    DEFINE_NTH_METHOD(fourth, Sunday)

    #define DEFINE_LAST_METHOD(day) \
        date scheduler::last_##day() const { return last_generic(day); }

    DEFINE_LAST_METHOD(Monday)
    DEFINE_LAST_METHOD(Tuesday)
    DEFINE_LAST_METHOD(Wednesday)
    DEFINE_LAST_METHOD(Thursday)
    DEFINE_LAST_METHOD(Friday)
    DEFINE_LAST_METHOD(Saturday)
    DEFINE_LAST_METHOD(Sunday)

}