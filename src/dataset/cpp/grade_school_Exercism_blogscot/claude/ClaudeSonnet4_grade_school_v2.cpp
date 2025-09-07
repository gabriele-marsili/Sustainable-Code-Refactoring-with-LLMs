#include "grade_school.h"

#include <algorithm>

namespace grade_school {

school::school() : school_roster{} {}

void school::add(string pupil_name, int grade) {
  auto& grade_list = school_roster[grade];
  auto insert_pos = std::lower_bound(grade_list.begin(), grade_list.end(), pupil_name);
  grade_list.insert(insert_pos, std::move(pupil_name));
}

const roster_type& school::roster() const { return school_roster; }

grade_type school::grade(int student_grade) const {
  auto iter = school_roster.find(student_grade);
  return (iter != school_roster.end()) ? iter->second : grade_type{};
}
}  // namespace grade_school