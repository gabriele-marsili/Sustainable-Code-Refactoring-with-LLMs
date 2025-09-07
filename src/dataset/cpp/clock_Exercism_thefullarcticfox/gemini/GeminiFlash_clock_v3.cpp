#include "clock.h"
#include <iomanip>
#include <sstream>
#include <utility>

namespace date_independent {
namespace clock {

std::pair<int, int> make_timepair(int hour, int min) {
  hour += min / 60;
  min %= 60;

  if (min < 0) {
    min += 60;
    --hour;
  }

  hour %= 24;
  if (hour < 0) {
    hour += 24;
  }

  return std::make_pair(hour, min);
}

at::at(int hour, int min) : time_hm(make_timepair(hour, min)) {}

at at::plus(int min) {
  int new_min = time_hm.second + min;
  time_hm = make_timepair(time_hm.first, new_min);
  return *this;
}

bool at::operator==(const at& other) const {
  return time_hm.first == other.time_hm.first &&
         time_hm.second == other.time_hm.second;
}

bool at::operator!=(const at& other) const {
  return !(*this == other);
}

at::operator std::string() const {
  std::string result;
  result.reserve(5); 

  int hour = time_hm.first;
  int min = time_hm.second;

  result.push_back((hour < 10 ? '0' : (char)((hour / 10) + '0')));
  result.push_back((char)((hour % 10) + '0'));
  result.push_back(':');
  result.push_back((min < 10 ? '0' : (char)((min / 10) + '0')));
  result.push_back((char)((min % 10) + '0'));

  return result;
}
}  // namespace clock
}  // namespace date_independent