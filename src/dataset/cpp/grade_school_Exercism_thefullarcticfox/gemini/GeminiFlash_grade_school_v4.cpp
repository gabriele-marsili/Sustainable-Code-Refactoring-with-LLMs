#include "grade_school.h"
#include <algorithm>
#include <vector>
#include <map>
#include <stdexcept>

namespace grade_school {

school::school() {}

const std::map<int, std::vector<std::string>>& school::roster() const {
    return _roster;
}

const std::vector<std::string> school::grade(int grade) const {
    auto it = _roster.find(grade);
    if (it != _roster.end()) {
        return it->second;
    } else {
        return {};
    }
}

void school::add(const std::string& name, int grade) {
    auto& grade_list = _roster[grade];
    grade_list.push_back(name);
    std::sort(grade_list.begin(), grade_list.end());
}

}  // namespace grade_school