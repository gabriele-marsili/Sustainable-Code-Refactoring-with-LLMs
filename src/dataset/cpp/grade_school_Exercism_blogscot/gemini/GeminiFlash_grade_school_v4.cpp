#include "grade_school.h"

#include <algorithm>
#include <vector>

namespace grade_school {

school::school() : school_roster{} {}

void school::add(string pupil_name, int grade) {
  auto& grade_list = school_roster[grade];
  grade_list.push_back(pupil_name);
  std::sort(grade_list.begin(), grade_list.end());
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