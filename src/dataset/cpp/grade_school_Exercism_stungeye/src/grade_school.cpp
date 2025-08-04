#include "grade_school.h"

#include <vector>
#include <algorithm>

namespace grade_school {
  void school::add(const std::string& name, int grade) {
    grades[grade].push_back(name);
    sort(grades[grade].begin(), grades[grade].end());
  }

  std::map<int, std::vector<std::string>> school::roster() const {
    return grades;
  }

  std::vector<std::string> school::grade(int grade_number) const {
    if (grades.count(grade_number) == 0) {
      return std::vector<std::string>();
    }
    return grades.at(grade_number);
  }
}  // namespace grade_school
