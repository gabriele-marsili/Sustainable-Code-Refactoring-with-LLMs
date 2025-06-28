#ifndef MEETUP_H_
#define MEETUP_H_

#include <boost/date_time/gregorian/gregorian.hpp>
#include <vector>

namespace meetup {

using namespace boost::gregorian;

typedef gregorian_calendar::day_of_week_type scheduler_day;
typedef boost::gregorian::date scheduler_date;

class scheduler {
  std::vector<scheduler_day> month_days;
  boost::date_time::months_of_year month;
  uint16_t year;
  uint8_t days_in_month;

  int find_teenth(gregorian_calendar::day_of_week_type day) const;
  int find_nth(scheduler_day, int) const;
  int find_last(scheduler_day day) const;
  int find_nth(const std::vector<scheduler_day>&, scheduler_day, int) const;

 public:
  scheduler(boost::date_time::months_of_year month, uint16_t year);
  const scheduler_date monteenth() const;
  const scheduler_date tuesteenth() const;
  const scheduler_date wednesteenth() const;
  const scheduler_date thursteenth() const;
  const scheduler_date friteenth() const;
  const scheduler_date saturteenth() const;
  const scheduler_date sunteenth() const;
  const scheduler_date first_monday() const;
  const scheduler_date first_tuesday() const;
  const scheduler_date first_wednesday() const;
  const scheduler_date first_thursday() const;
  const scheduler_date first_friday() const;
  const scheduler_date first_saturday() const;
  const scheduler_date first_sunday() const;
  const scheduler_date second_monday() const;
  const scheduler_date second_tuesday() const;
  const scheduler_date second_wednesday() const;
  const scheduler_date second_thursday() const;
  const scheduler_date second_friday() const;
  const scheduler_date second_saturday() const;
  const scheduler_date second_sunday() const;
  const scheduler_date third_monday() const;
  const scheduler_date third_tuesday() const;
  const scheduler_date third_wednesday() const;
  const scheduler_date third_thursday() const;
  const scheduler_date third_friday() const;
  const scheduler_date third_saturday() const;
  const scheduler_date third_sunday() const;
  const scheduler_date fourth_monday() const;
  const scheduler_date fourth_tuesday() const;
  const scheduler_date fourth_wednesday() const;
  const scheduler_date fourth_thursday() const;
  const scheduler_date fourth_friday() const;
  const scheduler_date fourth_saturday() const;
  const scheduler_date fourth_sunday() const;
  const scheduler_date last_monday() const;
  const scheduler_date last_tuesday() const;
  const scheduler_date last_wednesday() const;
  const scheduler_date last_thursday() const;
  const scheduler_date last_friday() const;
  const scheduler_date last_saturday() const;
  const scheduler_date last_sunday() const;
};

}  // namespace meetup

#endif  // MEETUP_H_
