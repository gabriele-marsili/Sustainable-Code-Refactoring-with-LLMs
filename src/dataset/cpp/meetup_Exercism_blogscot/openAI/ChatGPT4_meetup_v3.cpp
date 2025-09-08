#include "./meetup.h"

namespace meetup {

scheduler_day get_next_weekday(scheduler_day day) {
  return static_cast<scheduler_day>((day + 1) % 7);
}

int scheduler::find_teenth(scheduler_day day) const {
  for (int pos = 13; pos <= 19; ++pos) {
    if (month_days[pos] == day) return pos;
  }
  return -1;  // Should never reach here
}

int scheduler::find_nth(scheduler_day day, int nth) const {
  assert(nth > 0 && nth <= 4);
  int count = 0;
  for (int pos = 1; pos <= days_in_month; ++pos) {
    if (month_days[pos] == day) {
      if (++count == nth) return pos;
    }
  }
  return -1;  // Should never reach here
}

int scheduler::find_last(scheduler_day day) const {
  for (int pos = days_in_month; pos > 0; --pos) {
    if (month_days[pos] == day) return pos;
  }
  return -1;  // Should never reach here
}

scheduler::scheduler(months_of_year month, uint16_t year)
    : month(month), year(year), days_in_month(gregorian_calendar::end_of_month_day(year, month)), month_days(days_in_month + 1) {
  boost::gregorian::date d(year, month, 1);
  scheduler_day day{d.day_of_week()};
  for (int i = 1; i <= days_in_month; ++i) {
    month_days[i] = day;
    day = get_next_weekday(day);
  }
}

#define DEFINE_TEENTH_METHOD(day) \
  const scheduler_date scheduler::day##teenth() const { return {year, month, find_teenth(day)}; }

#define DEFINE_NTH_METHOD(day, nth) \
  const scheduler_date scheduler::nth##_##day() const { return {year, month, find_nth(day, nth)}; }

#define DEFINE_LAST_METHOD(day) \
  const scheduler_date scheduler::last_##day() const { return {year, month, find_last(day)}; }

DEFINE_TEENTH_METHOD(Monday)
DEFINE_TEENTH_METHOD(Tuesday)
DEFINE_TEENTH_METHOD(Wednesday)
DEFINE_TEENTH_METHOD(Thursday)
DEFINE_TEENTH_METHOD(Friday)
DEFINE_TEENTH_METHOD(Saturday)
DEFINE_TEENTH_METHOD(Sunday)

DEFINE_NTH_METHOD(Monday, first)
DEFINE_NTH_METHOD(Tuesday, first)
DEFINE_NTH_METHOD(Wednesday, first)
DEFINE_NTH_METHOD(Thursday, first)
DEFINE_NTH_METHOD(Friday, first)
DEFINE_NTH_METHOD(Saturday, first)
DEFINE_NTH_METHOD(Sunday, first)

DEFINE_NTH_METHOD(Monday, second)
DEFINE_NTH_METHOD(Tuesday, second)
DEFINE_NTH_METHOD(Wednesday, second)
DEFINE_NTH_METHOD(Thursday, second)
DEFINE_NTH_METHOD(Friday, second)
DEFINE_NTH_METHOD(Saturday, second)
DEFINE_NTH_METHOD(Sunday, second)

DEFINE_NTH_METHOD(Monday, third)
DEFINE_NTH_METHOD(Tuesday, third)
DEFINE_NTH_METHOD(Wednesday, third)
DEFINE_NTH_METHOD(Thursday, third)
DEFINE_NTH_METHOD(Friday, third)
DEFINE_NTH_METHOD(Saturday, third)
DEFINE_NTH_METHOD(Sunday, third)

DEFINE_NTH_METHOD(Monday, fourth)
DEFINE_NTH_METHOD(Tuesday, fourth)
DEFINE_NTH_METHOD(Wednesday, fourth)
DEFINE_NTH_METHOD(Thursday, fourth)
DEFINE_NTH_METHOD(Friday, fourth)
DEFINE_NTH_METHOD(Saturday, fourth)
DEFINE_NTH_METHOD(Sunday, fourth)

DEFINE_LAST_METHOD(Monday)
DEFINE_LAST_METHOD(Tuesday)
DEFINE_LAST_METHOD(Wednesday)
DEFINE_LAST_METHOD(Thursday)
DEFINE_LAST_METHOD(Friday)
DEFINE_LAST_METHOD(Saturday)
DEFINE_LAST_METHOD(Sunday)

}  // namespace meetup