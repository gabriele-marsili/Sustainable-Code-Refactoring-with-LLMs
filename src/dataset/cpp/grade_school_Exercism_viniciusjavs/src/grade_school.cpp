#include "grade_school.h"
#include <algorithm>

namespace grade_school {
roster_t const &school::roster() const { return roster_; }
void school::add(string name, int grade) {
  auto &students = roster_[grade];
  auto pos = std::upper_bound(cbegin(students), cend(students), name);
  students.insert(pos, name);
}
vector<string> school::grade(int grade) const {
  return roster_.count(grade) == 0 ? vector<string>{} : roster_.at(grade);
}
} // namespace grade_school
