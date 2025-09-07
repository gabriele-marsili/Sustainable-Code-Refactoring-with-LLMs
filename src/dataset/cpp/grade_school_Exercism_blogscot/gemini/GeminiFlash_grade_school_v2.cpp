#include "grade_school.h"

#include <algorithm>
#include <vector>

namespace grade_school {

school::school() {}

void school::add(const string& pupil_name, int grade) {
  school_roster[grade].push_back(pupil_name);
  std::sort(school_roster[grade].begin(), school_roster[grade].end());
}

const school::roster_type& school::roster() const { return school_roster; }

school::grade_type school::grade(int student_grade) const {
  auto it = school_roster.find(student_grade);
  if (it != school_roster.end()) {
    return it->second;
  } else {
    return {};
  }
}

}  // namespace grade_school