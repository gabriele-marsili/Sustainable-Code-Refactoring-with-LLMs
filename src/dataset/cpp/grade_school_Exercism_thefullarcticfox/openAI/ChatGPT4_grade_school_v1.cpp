#include "grade_school.h"
#include <algorithm>
using namespace std;

namespace grade_school {
    school::school() {}

    const map<int, vector<string>>& school::roster() const {
        return _roster;
    }

    const vector<string> school::grade(int grade) const {
        auto it = _roster.find(grade);
        return (it != _roster.end()) ? it->second : vector<string>();
    }

    void school::add(const string& name, int grade) {
        auto& students = _roster[grade];
        auto pos = lower_bound(students.begin(), students.end(), name);
        students.insert(pos, name);
    }
}  // namespace grade_school