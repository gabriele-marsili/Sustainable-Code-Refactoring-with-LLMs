#include "./robot_name.h"
#include <sstream>

namespace robot_name {

using std::string;

inline char get_random_character(char initial, int range) {
  int random_number = std::rand() % range;
  return initial + random_number;
}

inline char get_random_letter() { return get_random_character('A', 26); }
inline char get_random_number() { return get_random_character('0', 10); }

std::string const get_robot_name() {
  std::stringstream ss;

  ss << get_random_letter() << get_random_letter() << get_random_number()
     << get_random_number() << get_random_number();

  return ss.str();
}

robot::robot() { robotName = get_robot_name(); }
std::string const robot::name() const { return robotName; }
void robot::reset() { robotName = get_robot_name(); }

}  // namespace robot_name
