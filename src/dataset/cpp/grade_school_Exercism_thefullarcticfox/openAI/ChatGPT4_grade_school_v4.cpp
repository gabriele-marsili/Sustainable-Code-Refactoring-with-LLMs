#include "grade_school.h"
#include <algorithm>
#include <unordered_map>
using namespace std;

namespace grade_school {
    school::school() {}

    const map<int, vector<string>>& school::roster() const {
        return _roster;
    }

    vector<string> school::grade(int grade) const {
        auto it = _roster.find(grade);
        return (it != _roster.end()) ? it->second : vector<string>();
    }

    void school::add(const string& name, int grade) {
        auto& students = _roster[grade];
        if (find(students.begin(), students.end(), name) == students.end()) {
            students.insert(lower_bound(students.begin(), students.end(), name), name);
        }
    }
}  // namespace grade_school