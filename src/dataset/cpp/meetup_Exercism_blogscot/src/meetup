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
    : month(month), year(year), days_in_month(gregorian_calendar::end_of_month_day(year, month)) {
  month_days.reserve(days_in_month + 1);
  month_days.push_back(0);  // offset by one, dates start 1, 2, 3 ...
  scheduler_day day = static_cast<scheduler_day>(boost::gregorian::date(year, month, 1).day_of_week());

  for (int i = 1; i <= days_in_month; ++i) {
    month_days.push_back(day);
    day = get_next_weekday(day);
  }
}

#define DEFINE_TEENTH_FUNCTION(day) \
  const scheduler_date scheduler::day##teenth() const { \
    return {year, month, find_teenth(day)}; \
  }

#define DEFINE_NTH_FUNCTION(day, nth) \
  const scheduler_date scheduler::nth##_##day() const { \
    return {year, month, find_nth(day, nth)}; \
  }

#define DEFINE_LAST_FUNCTION(day) \
  const scheduler_date scheduler::last_##day() const { \
    return {year, month, find_last(day)}; \
  }

DEFINE_TEENTH_FUNCTION(Monday)
DEFINE_TEENTH_FUNCTION(Tuesday)
DEFINE_TEENTH_FUNCTION(Wednesday)
DEFINE_TEENTH_FUNCTION(Thursday)
DEFINE_TEENTH_FUNCTION(Friday)
DEFINE_TEENTH_FUNCTION(Saturday)
DEFINE_TEENTH_FUNCTION(Sunday)

DEFINE_NTH_FUNCTION(Monday, first)
DEFINE_NTH_FUNCTION(Tuesday, first)
DEFINE_NTH_FUNCTION(Wednesday, first)
DEFINE_NTH_FUNCTION(Thursday, first)
DEFINE_NTH_FUNCTION(Friday, first)
DEFINE_NTH_FUNCTION(Saturday, first)
DEFINE_NTH_FUNCTION(Sunday, first)

DEFINE_NTH_FUNCTION(Monday, second)
DEFINE_NTH_FUNCTION(Tuesday, second)
DEFINE_NTH_FUNCTION(Wednesday, second)
DEFINE_NTH_FUNCTION(Thursday, second)
DEFINE_NTH_FUNCTION(Friday, second)
DEFINE_NTH_FUNCTION(Saturday, second)
DEFINE_NTH_FUNCTION(Sunday, second)

DEFINE_NTH_FUNCTION(Monday, third)
DEFINE_NTH_FUNCTION(Tuesday, third)
DEFINE_NTH_FUNCTION(Wednesday, third)
DEFINE_NTH_FUNCTION(Thursday, third)
DEFINE_NTH_FUNCTION(Friday, third)
DEFINE_NTH_FUNCTION(Saturday, third)
DEFINE_NTH_FUNCTION(Sunday, third)

DEFINE_NTH_FUNCTION(Monday, fourth)
DEFINE_NTH_FUNCTION(Tuesday, fourth)
DEFINE_NTH_FUNCTION(Wednesday, fourth)
DEFINE_NTH_FUNCTION(Thursday, fourth)
DEFINE_NTH_FUNCTION(Friday, fourth)
DEFINE_NTH_FUNCTION(Saturday, fourth)
DEFINE_NTH_FUNCTION(Sunday, fourth)

DEFINE_LAST_FUNCTION(Monday)
DEFINE_LAST_FUNCTION(Tuesday)
DEFINE_LAST_FUNCTION(Wednesday)
DEFINE_LAST_FUNCTION(Thursday)
DEFINE_LAST_FUNCTION(Friday)
DEFINE_LAST_FUNCTION(Saturday)
DEFINE_LAST_FUNCTION(Sunday)

#undef DEFINE_TEENTH_FUNCTION
#undef DEFINE_NTH_FUNCTION
#undef DEFINE_LAST_FUNCTION

}  // namespace meetup