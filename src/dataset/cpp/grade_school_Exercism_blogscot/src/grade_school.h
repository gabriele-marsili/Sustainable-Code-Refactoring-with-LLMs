#ifndef GRADE_SCHOOL_H_
#define GRADE_SCHOOL_H_

#include <map>
#include <string>
#include <vector>

namespace grade_school {

using std::map;
using std::string;
using std::vector;

typedef map<int, vector<string>> roster_type;
typedef vector<string> grade_type;

class school {
  roster_type school_roster;

 public:
  school();
  void add(string pupil_name, int grade);
  const roster_type& roster() const;
  grade_type grade(int student_grade) const;
};

}  // namespace grade_school

#endif  // GRADE_SCHOOL_H_
