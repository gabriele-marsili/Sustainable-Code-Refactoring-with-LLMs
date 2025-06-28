#include "grade_school.h"

#include <algorithm>

namespace grade_school {

school::school() : school_roster{} {}

void school::add(string pupil_name, int grade) {
  if (school_roster[grade].empty()) {
    school_roster[grade] = {pupil_name};
  } else {
    school_roster[grade].push_back(pupil_name);
    sort(begin(school_roster[grade]), end(school_roster[grade]));
  }
}

const roster_type& school::roster() const { return school_roster; }

grade_type school::grade(int student_grade) const {
  auto iter = school_roster.find(student_grade);
  return (iter != school_roster.end()) ? iter->second : grade_type{};
}
}  // namespace grade_school
