
#include "./clock.h"
#include <iomanip>
#include <sstream>

namespace date_independent {

int normalise(int value, int limit) { return (value % limit + limit) % limit; }

clock::clock(int time) : total_time(normalise(time, 60 * 24)) {}

bool clock::operator==(const clock& other) const {
  return total_time == other.total_time;
}

bool clock::operator!=(const clock& other) const {
  return total_time != other.total_time;
}

clock::operator std::string() const {
  std::stringstream ss;
  ss << std::setw(2) << std::setfill('0') << std::to_string(total_time / 60);
  ss << ":";
  ss << std::setw(2) << std::setfill('0') << std::to_string(total_time % 60);
  return ss.str();
}

clock clock::at(int hours, int minutes) { return clock(hours * 60 + minutes); }
string clock::plus(int minutes) { return clock(total_time + minutes); }

}  // namespace date_independent
