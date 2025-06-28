#include "./meetup.h"

namespace meetup {

scheduler_day get_next_weekday(scheduler_day day) {
  return static_cast<scheduler_day>((day + 1) % 7);
}

int scheduler::find_teenth(scheduler_day day) const {
  auto pos = 13;
  while (month_days.at(pos) != day) {
    pos++;
  }
  return pos;
}

int scheduler::find_nth(scheduler_day day, int nth) const {
  assert(nth > 0 && nth <= 4);
  auto pos = 1;
  auto count{0};
  while (true) {
    if (month_days.at(pos) == day) {
      count++;
      if (count == nth) return pos;
    }
    pos++;
  }
  return pos;
}

int scheduler::find_last(scheduler_day day) const {
  int pos = days_in_month;

  while (month_days.at(pos) != day) {
    pos--;
  }
  return pos;
}

scheduler::scheduler(months_of_year month, uint16_t year)
    : month(month), year(year) {
  days_in_month = gregorian_calendar::end_of_month_day(year, month);
  month_days.push_back(0);  // offset by one, dates start 1, 2, 3 ...
  boost::gregorian::date d(year, month, 1);
  scheduler_day day{d.day_of_week()};

  for (int i = 1; i <= days_in_month; i++) {
    month_days.push_back(day);
    day = get_next_weekday(day);
  }
}

const scheduler_date scheduler::monteenth() const {
  return {year, month, find_teenth(Monday)};
}
const scheduler_date scheduler::tuesteenth() const {
  return {year, month, find_teenth(Tuesday)};
}
const scheduler_date scheduler::wednesteenth() const {
  return {year, month, find_teenth(Wednesday)};
}
const scheduler_date scheduler::thursteenth() const {
  return {year, month, find_teenth(Thursday)};
}
const scheduler_date scheduler::friteenth() const {
  return {year, month, find_teenth(Friday)};
}
const scheduler_date scheduler::saturteenth() const {
  return {year, month, find_teenth(Saturday)};
}
const scheduler_date scheduler::sunteenth() const {
  return {year, month, find_teenth(Sunday)};
}
const scheduler_date scheduler::first_monday() const {
  return {year, month, find_nth(Monday, 1)};
}
const scheduler_date scheduler::first_tuesday() const {
  return {year, month, find_nth(Tuesday, 1)};
}
const scheduler_date scheduler::first_wednesday() const {
  return {year, month, find_nth(Wednesday, 1)};
}
const scheduler_date scheduler::first_thursday() const {
  return {year, month, find_nth(Thursday, 1)};
}
const scheduler_date scheduler::first_friday() const {
  return {year, month, find_nth(Friday, 1)};
}
const scheduler_date scheduler::first_saturday() const {
  return {year, month, find_nth(Saturday, 1)};
}
const scheduler_date scheduler::first_sunday() const {
  return {year, month, find_nth(Sunday, 1)};
}
const scheduler_date scheduler::second_monday() const {
  return {year, month, find_nth(Monday, 2)};
}
const scheduler_date scheduler::second_tuesday() const {
  return {year, month, find_nth(Tuesday, 2)};
}
const scheduler_date scheduler::second_wednesday() const {
  return {year, month, find_nth(Wednesday, 2)};
}
const scheduler_date scheduler::second_thursday() const {
  return {year, month, find_nth(Thursday, 2)};
}
const scheduler_date scheduler::second_friday() const {
  return {year, month, find_nth(Friday, 2)};
}
const scheduler_date scheduler::second_saturday() const {
  return {year, month, find_nth(Saturday, 2)};
}
const scheduler_date scheduler::second_sunday() const {
  return {year, month, find_nth(Sunday, 2)};
}
const scheduler_date scheduler::third_monday() const {
  return {year, month, find_nth(Monday, 3)};
}
const scheduler_date scheduler::third_tuesday() const {
  return {year, month, find_nth(Tuesday, 3)};
}
const scheduler_date scheduler::third_wednesday() const {
  return {year, month, find_nth(Wednesday, 3)};
}
const scheduler_date scheduler::third_thursday() const {
  return {year, month, find_nth(Thursday, 3)};
}
const scheduler_date scheduler::third_friday() const {
  return {year, month, find_nth(Friday, 3)};
}
const scheduler_date scheduler::third_saturday() const {
  return {year, month, find_nth(Saturday, 3)};
}
const scheduler_date scheduler::third_sunday() const {
  return {year, month, find_nth(Sunday, 3)};
}
const scheduler_date scheduler::fourth_monday() const {
  return {year, month, find_nth(Monday, 4)};
}
const scheduler_date scheduler::fourth_tuesday() const {
  return {year, month, find_nth(Tuesday, 4)};
}
const scheduler_date scheduler::fourth_wednesday() const {
  return {year, month, find_nth(Wednesday, 4)};
}
const scheduler_date scheduler::fourth_thursday() const {
  return {year, month, find_nth(Thursday, 4)};
}
const scheduler_date scheduler::fourth_friday() const {
  return {year, month, find_nth(Friday, 4)};
}
const scheduler_date scheduler::fourth_saturday() const {
  return {year, month, find_nth(Saturday, 4)};
}
const scheduler_date scheduler::fourth_sunday() const {
  return {year, month, find_nth(Sunday, 4)};
}
const scheduler_date scheduler::last_monday() const {
  return {year, month, find_last(Monday)};
}
const scheduler_date scheduler::last_tuesday() const {
  return {year, month, find_last(Tuesday)};
}
const scheduler_date scheduler::last_wednesday() const {
  return {year, month, find_last(Wednesday)};
}
const scheduler_date scheduler::last_thursday() const {
  return {year, month, find_last(Thursday)};
}
const scheduler_date scheduler::last_friday() const {
  return {year, month, find_last(Friday)};
}
const scheduler_date scheduler::last_saturday() const {
  return {year, month, find_last(Saturday)};
}
const scheduler_date scheduler::last_sunday() const {
  return {year, month, find_last(Sunday)};
}

}  // namespace meetup
