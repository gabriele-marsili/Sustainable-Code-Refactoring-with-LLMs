#ifndef CLOCK_H_
#define CLOCK_H_

#include <string>

namespace date_independent {

using std::string;

class clock {
  uint32_t total_time;
  explicit clock(int time);

 public:
  static clock at(int, int);
  string plus(int);
  operator string() const;
  bool operator==(const clock& other) const;
  bool operator!=(const clock& other) const;
};

}  // namespace date_independent

#endif  // CLOCK_H_
