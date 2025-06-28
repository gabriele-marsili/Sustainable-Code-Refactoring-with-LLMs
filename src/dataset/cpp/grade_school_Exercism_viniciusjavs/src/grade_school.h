#if !defined(GRADE_SCHOOL_H)
#define GRADE_SCHOOL_H

#include <map>
#include <string>
#include <vector>

namespace grade_school {

using std::string;
using std::vector;

using roster_t = std::map<int, vector<string>>;

class school {
  roster_t roster_;

public:
  roster_t const &roster() const;
  void add(string name, int grade);
  vector<string> grade(int grade) const;
};

} // namespace grade_school

#endif // GRADE_SCHOOL_H
